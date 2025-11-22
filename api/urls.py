from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SensorDataViewSet, RegisterView, ChangePasswordView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),

    # Register
    path('register/', RegisterView.as_view(), name='register'),

    # Login with email verification
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),

    # Refresh token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Change password
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
]
