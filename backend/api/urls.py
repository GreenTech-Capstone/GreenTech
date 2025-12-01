from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    CustomTokenObtainPairView,
    VerifyEmailView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
    ProfileView,
    ChangePasswordView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("verify-email/", VerifyEmailView.as_view(), name="verify-email"),

    path("password-reset/", PasswordResetRequestView.as_view(), name="password-reset"),
    path("password-reset-confirm/", PasswordResetConfirmView.as_view(), name="password-reset-confirm"),

    # Auth User Profile
    path("profile/", ProfileView.as_view(), name="profile"),

    # Change Password (Authenticated)
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
]
