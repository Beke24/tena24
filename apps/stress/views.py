from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import StressAssessmentSerializer


def calculate_stress(stress_level, sleep_quality, energy_level):
    score = int(stress_level) * 7
    score += {"good": 0, "average": 12, "poor": 24}[sleep_quality]
    score += {"high": 0, "medium": 10, "low": 20}[energy_level]
    score = min(100, score)
    if score < 35:
        result = "Low Stress"
    elif score < 70:
        result = "Moderate Stress"
    else:
        result = "High Stress"
    return result, score


class StressAssessmentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = StressAssessmentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result, score = calculate_stress(
            serializer.validated_data["stress_level"],
            serializer.validated_data["sleep_quality"],
            serializer.validated_data["energy_level"],
        )
        assessment = serializer.save(user=request.user, result=result, score=score)
        return Response(StressAssessmentSerializer(assessment).data, status=status.HTTP_201_CREATED)

