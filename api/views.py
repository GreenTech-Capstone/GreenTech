from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from django.urls import reverse

import uuid

# Import models + email helper
from .models import EmailVerificationToken
from .utils.email import send_email_via_sendgrid


class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not username or not password:
            return Response({"error": "All fields required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already registered"}, status=status.HTTP_400_BAD_REQUEST)

        # Create inactive user
        user = User.objects.create_user(username=username, email=email, password=password)
        user.is_active = False
        user.save()

        # Generate unique verification token
        token = str(uuid.uuid4())
        EmailVerificationToken.objects.create(user=user, token=token)

        # Render domain
        base_url = "https://greentech-ud0q.onrender.com"

        # Full verification link
        verify_url = f"{base_url}{reverse('verify-email')}?token={token}"

        # Send verification email via SendGrid
        send_email_via_sendgrid(
            subject="Verify your GreenTech account",
            message=(
                f"Hello {username},\n\n"
                f"Please verify your email by clicking the link below:\n{verify_url}\n\n"
                "Thank you for registering with GreenTech!"
            ),
            to_email=user.email
        )

        return Response({
            "message": "Account created. Check your email to verify!"
        }, status=status.HTTP_201_CREATED)


class VerifyEmailView(APIView):
    def get(self, request):
        token = request.GET.get("token")

        if not token:
            return Response({"error": "Token missing"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            record = EmailVerificationToken.objects.get(token=token)
        except EmailVerificationToken.DoesNotExist:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

        # Activate user
        user = record.user
        user.is_active = True
        user.save()

        # Delete used token
        record.delete()

        return Response({"message": "Email verified! You may now log in."})


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        if not self.user.is_active:
            raise AuthenticationFailed("Email not verified. Please check your inbox.")
        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
