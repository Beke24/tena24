from rest_framework import serializers

from .models import HealthProfile


class HealthProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthProfile
        fields = (
            "id",
            "age",
            "gender",
            "weight",
            "height",
            "daily_budget",
            "activity_level",
            "disease",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")

