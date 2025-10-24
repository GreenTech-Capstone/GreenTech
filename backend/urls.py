# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

# Optional: simple root view to avoid 404
def home(request):
    return HttpResponse("Welcome to the Django API backend!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # include your app URLs here
    path('', home),  # root URL
]
