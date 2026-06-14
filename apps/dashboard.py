from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.nutrition.serializers import MealPlanSerializer
from apps.profiles.serializers import HealthProfileSerializer
from apps.stress.serializers import StressAssessmentSerializer


class DashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile = getattr(request.user, "health_profile", None)
        meal_plan = request.user.meal_plans.first()
        stress = request.user.stress_assessments.first()
        nutrition_score = meal_plan.score.score if meal_plan and hasattr(meal_plan, "score") else 0
        stress_score = stress.score if stress else 0
        recommendations = []
        if nutrition_score < 70:
            recommendations.append("Add one protein source and one vegetable serving today.")
        if stress_score >= 70:
            recommendations.append("Use the breathing guide and reduce evening caffeine.")
        if not recommendations:
            recommendations.append("Keep your meal rhythm steady and repeat what worked today.")
        return Response(
            {
                "profile": HealthProfileSerializer(profile).data if profile else None,
                "nutrition_score": nutrition_score,
                "stress_score": stress_score,
                "today_meal_plan": MealPlanSerializer(meal_plan).data if meal_plan else None,
                "latest_stress": StressAssessmentSerializer(stress).data if stress else None,
                "wellness_recommendations": recommendations,
            }
        )
