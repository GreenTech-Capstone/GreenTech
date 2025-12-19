from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
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


class EmailVerificationToken(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Verification token for {self.user.username}"


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile"
    )
    name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    address = models.TextField(blank=True)
    contact = models.CharField(max_length=50, blank=True)
    gender = models.CharField(max_length=30, blank=True)
    birthday = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"Profile for {self.user.username}"


# ✅ SAFE profile creation signal (NO admin login crash)
@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    """
    Ensures every User always has a Profile.
    Prevents RelatedObjectDoesNotExist errors.
    """
    if created:
        Profile.objects.create(user=instance)
    else:
        Profile.objects.get_or_create(user=instance)
