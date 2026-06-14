from django.conf import settings
from django.db import models


class StressAssessment(models.Model):
    class SleepQuality(models.TextChoices):
        GOOD = "good", "Good"
        AVERAGE = "average", "Average"
        POOR = "poor", "Poor"

    class EnergyLevel(models.TextChoices):
        HIGH = "high", "High"
        MEDIUM = "medium", "Medium"
        LOW = "low", "Low"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="stress_assessments")
    stress_level = models.PositiveSmallIntegerField()
    sleep_quality = models.CharField(max_length=16, choices=SleepQuality.choices)
    energy_level = models.CharField(max_length=16, choices=EnergyLevel.choices)
    result = models.CharField(max_length=24)
    score = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-created_at",)

