from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.http import HttpResponse
from .views import CustomTokenObtainPairView

# Optional: simple root view to avoid 404
def home(request):
    return HttpResponse("Welcome to the Django API backend!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # include your app URLs here
    path('accounts/', include('allauth.urls')),  # login, signup, logout
    path('', home),  # root URL
    path('api/login/', CustomTokenObtainPairView.as_view()),

    # Password reset URLs
    path('password-reset/',
         auth_views.PasswordResetView.as_view(),
         name='password_reset'),
    path('password-reset/done/',
         auth_views.PasswordResetDoneView.as_view(),
         name='password_reset_done'),
    path('reset/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(),
         name='password_reset_confirm'),
    path('reset/done/',
         auth_views.PasswordResetCompleteView.as_view(),
         name='password_reset_complete'),
]
