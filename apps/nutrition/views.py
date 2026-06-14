from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import MealPlan, NutritionScore
from .serializers import MealPlanInputSerializer, MealPlanSerializer
from .services import calculate_nutrition_score, generate_meal_plan


class MealPlanView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = MealPlanInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        result = generate_meal_plan(data["age"], data["weight"], data["disease"], data["budget"])
        plan = MealPlan.objects.create(
            user=request.user,
            age=data["age"],
            weight=data["weight"],
            disease=data["disease"],
            budget=data["budget"],
            breakfast=result["breakfast"],
            lunch=result["lunch"],
            dinner=result["dinner"],
            nutrition_tips=result.get("nutrition_tips", []),
            optimizer=result.get("optimizer", {}),
        )
        NutritionScore.objects.create(user=request.user, meal_plan=plan, **calculate_nutrition_score(plan, data["disease"]))
        return Response(MealPlanSerializer(plan).data, status=status.HTTP_201_CREATED)

