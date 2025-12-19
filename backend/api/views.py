import uuid
import os
from django.urls import reverse
from django.contrib.auth.models import User
from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateAPIView

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed

from .models import EmailVerificationToken, Profile
from .serializers import RegisterSerializer, ProfileSerializer
from .utils.email import send_email_via_sendgrid


# -------------------------------
# REGISTER VIEW (DRF)
# -------------------------------
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Create email verification token
            token = str(uuid.uuid4())
            EmailVerificationToken.objects.update_or_create(user=user, defaults={"token": token})

            # Prepare verification links
            app_scheme = os.getenv("MOBILE_APP_SCHEME", "greentechapp")
            app_link = f"{app_scheme}://verify-email/{token}"
            web_domain = os.getenv("RENDER_DOMAIN", "greentech-ud0q.onrender.com")
            web_link = f"https://{web_domain}{reverse('verify-email')}?token={token}"

            message = (
                f"Hello {user.username},\n\n"
                f"Verify your GreenTech account:\n"
                f"In App: {app_link}\n"
                f"Web: {web_link}\n\n"
                "Thank you!"
            )

            send_email_via_sendgrid(
                subject="Verify your GreenTech Account",
                message=message,
                to_email=user.email
            )

            return Response({"detail": "Account created successfully. Check your email for verification."},
                            status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------------------------
# EMAIL VERIFY (HTML PAGE RENDER)
# -------------------------------
class VerifyEmailView(generics.GenericAPIView):
    def get(self, request):
        token = request.GET.get("token")

        if not token:
            return render(request, "verify_success.html", {"error": "Token missing"})

        try:
            record = EmailVerificationToken.objects.get(token=token)
        except EmailVerificationToken.DoesNotExist:
            return render(request, "verify_success.html", {"error": "Invalid or expired verification link."})

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
# PROFILE VIEW
# -------------------------------
class ProfileView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
        profile, _ = Profile.objects.get_or_create(user=self.request.user)
        return profile
