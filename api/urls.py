from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # Register
    path('register/', RegisterView.as_view(), name='register'),

    # Login with email verification
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),

    # Refresh token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
