from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    RegisterView,
    CustomTokenObtainPairView,
    VerifyEmailView
)

urlpatterns = [
    # Register
    path("register/", RegisterView.as_view(), name="register"),

    # Login (requires verified email)
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),

    # Email Verification
    path("verify-email/", VerifyEmailView.as_view(), name="verify-email"),

    # Token refresh
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
