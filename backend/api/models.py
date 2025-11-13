models

from django.db import models
from django.contrib.auth.models import User

class SensorData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    air_temp = models.FloatField()
    water_temp = models.FloatField()
    humidity = models.FloatField()
    ph_level = models.FloatField()
    nutrients = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"
