# api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SensorDataViewSet, RegisterView, ChangePasswordView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Create router and register SensorDataViewSet
router = DefaultRouter()
router.register('sensor-data', SensorDataViewSet, basename='sensor-data')  # ✅ Sensor data endpoint

# URL patterns
urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),  # ✅ Change password
]
