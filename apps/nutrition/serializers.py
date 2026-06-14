from rest_framework import serializers

from .models import EthiopianFood, MealPlan, NutritionScore


class EthiopianFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = EthiopianFood
        fields = "__all__"


class MealPlanInputSerializer(serializers.Serializer):
    age = serializers.IntegerField(min_value=1, max_value=120)
    weight = serializers.DecimalField(max_digits=5, decimal_places=2)
    disease = serializers.ChoiceField(choices=["diabetes", "hypertension", "obesity", "none"])
    budget = serializers.DecimalField(max_digits=8, decimal_places=2)


class NutritionScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = NutritionScore
        fields = ("score", "meal_quality", "disease_compatibility", "budget_efficiency", "notes")


class MealPlanSerializer(serializers.ModelSerializer):
    score = NutritionScoreSerializer(read_only=True)

    class Meta:
        model = MealPlan
        fields = (
            "id",
            "age",
            "weight",
            "disease",
            "budget",
            "breakfast",
            "lunch",
            "dinner",
            "nutrition_tips",
            "optimizer",
            "score",
            "created_at",
        )

