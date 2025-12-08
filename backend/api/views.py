import uuid
import os

from django.contrib.auth.models import User
from django.urls import reverse
from django.contrib.auth.hashers import check_password

from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateAPIView

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import EmailVerificationToken, Profile
from .serializers import ProfileSerializer
from .utils.email import send_email_via_sendgrid


# -------------------------------
# REGISTER + EMAIL VERIFICATION
# -------------------------------
class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not username or not email or not password:
            return Response({"error": "All fields required"}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken"}, status=400)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already registered"}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        user.is_active = False
        user.save()

        token = str(uuid.uuid4())
        EmailVerificationToken.objects.update_or_create(user=user, defaults={"token": token})

        app_scheme = os.getenv("MOBILE_APP_SCHEME", "greentechapp")
        app_link = f"{app_scheme}://verify-email/{token}"
        web_domain = os.getenv("RENDER_DOMAIN", "greentech-ud0q.onrender.com")
        web_link = f"https://{web_domain}{reverse('verify-email')}?token={token}"

        message = (
            f"Hello {username},\n\n"
            f"Verify your GreenTech account:\n"
            f"In App: {app_link}\n"
            f"Web: {web_link}\n\n"
            "Thank you!"
        )

        send_email_via_sendgrid(
            subject="Verify your GreenTech Account",
            message=message,
            to_email=email
        )

        return Response({"message": "Account created. Check your email."}, status=201)


# -------------------------------
# EMAIL VERIFY (HTML PAGE RENDER)
# -------------------------------
class VerifyEmailView(APIView):
    def get(self, request):
        token = request.GET.get("token")

        if not token:
            return render(request, "verify_success.html", {
                "error": "Token missing"
            })

        try:
            record = EmailVerificationToken.objects.get(token=token)
        except EmailVerificationToken.DoesNotExist:
            return render(request, "verify_success.html", {
                "error": "Invalid or expired verification link."
            })

        user = record.user
        user.is_active = True
        user.save()
        record.delete()

        return render(request, "verify_success.html", {})


# -------------------------------
# CUSTOM JWT LOGIN
# -------------------------------
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        if not self.user.is_active:
            raise AuthenticationFailed("Email not verified.")
        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# -------------------------------
# PASSWORD RESET FLOW
# -------------------------------
class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"error": "Email required"}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Email not registered"}, status=404)

        token = str(uuid.uuid4())
        EmailVerificationToken.objects.update_or_create(user=user, defaults={"token": token})

        app_scheme = os.getenv("MOBILE_APP_SCHEME", "greentechapp")
        app_link = f"{app_scheme}://reset-password/{token}"
        web_domain = os.getenv("RENDER_DOMAIN", "greentech-ud0q.onrender.com")
        web_link = f"https://{web_domain}{reverse('password-reset-confirm')}?token={token}"

        message = (
            f"Hello {user.username},\n\n"
            f"Reset your password:\n"
            f"In App: {app_link}\n"
            f"Web: {web_link}\n"
            "If this was not you, ignore this."
        )

        send_email_via_sendgrid(
            subject="Reset Your Password",
            message=message,
            to_email=email
        )

        return Response({"message": "Password reset email sent"}, status=200)


class PasswordResetConfirmView(APIView):
    def post(self, request):
        token = request.data.get("token")
        new_password = request.data.get("password")

        if not token or not new_password:
            return Response({"error": "Token + password required"}, status=400)

        try:
            record = EmailVerificationToken.objects.get(token=token)
        except EmailVerificationToken.DoesNotExist:
            return Response({"error": "Invalid/expired token"}, status=400)

        user = record.user
        user.set_password(new_password)
        user.save()
        record.delete()

        return Response({"message": "Password reset successful"}, status=200)


# -------------------------------
# PROFILE VIEW
# -------------------------------
class ProfileView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
        profile, _ = Profile.objects.get_or_create(user=self.request.user)
        return profile


# -------------------------------
# CHANGE PASSWORD (AUTH REQUIRED)
# -------------------------------
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        if not new_password or not confirm_password:
            return Response({"error": "All fields required"}, status=400)

        if new_password != confirm_password:
            return Response({"error": "Passwords do not match"}, status=400)

        user.set_password(new_password)
        user.save()

        return Response({"message": "Password updated successfully"}, status=200)
