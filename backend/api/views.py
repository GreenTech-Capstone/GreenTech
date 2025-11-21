from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from allauth.account.utils import send_email_confirmation
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import status
from rest_framework.response import Response

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
        user.is_active = False  # Require email verification
        user.save()

        # Send verification email
        send_email_confirmation(request, user)

        return Response({
            "message": "Account created. Please check your email to verify."
        }, status=status.HTTP_201_CREATED)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        if not self.user.is_active:
            raise AuthenticationFailed("Email not verified. Please check your inbox.")
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer