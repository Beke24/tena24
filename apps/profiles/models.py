from django.conf import settings
from django.db import models


class HealthProfile(models.Model):
    class Gender(models.TextChoices):
        FEMALE = "female", "Female"
        MALE = "male", "Male"
        OTHER = "other", "Other"

    class ActivityLevel(models.TextChoices):
        LOW = "low", "Low"
        MODERATE = "moderate", "Moderate"
        HIGH = "high", "High"

    class Disease(models.TextChoices):
        DIABETES = "diabetes", "Diabetes"
        HYPERTENSION = "hypertension", "Hypertension"
        OBESITY = "obesity", "Obesity"
        NONE = "none", "None"

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="health_profile")
    age = models.PositiveSmallIntegerField()
    gender = models.CharField(max_length=16, choices=Gender.choices)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    height = models.DecimalField(max_digits=5, decimal_places=2)
    daily_budget = models.DecimalField(max_digits=8, decimal_places=2)
    activity_level = models.CharField(max_length=16, choices=ActivityLevel.choices)
    disease = models.CharField(max_length=24, choices=Disease.choices, default=Disease.NONE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} profile"

