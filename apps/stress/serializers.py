from rest_framework import serializers

from .models import StressAssessment


class StressAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StressAssessment
        fields = ("id", "stress_level", "sleep_quality", "energy_level", "result", "score", "created_at")
        read_only_fields = ("id", "result", "score", "created_at")

