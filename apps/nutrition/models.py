from django.conf import settings
from django.db import models


class EthiopianFood(models.Model):
    name = models.CharField(max_length=80, unique=True)
    category = models.CharField(max_length=40)
    protein = models.BooleanField(default=False)
    fiber = models.BooleanField(default=False)
    vitamins = models.BooleanField(default=False)
    estimated_cost_etb = models.DecimalField(max_digits=8, decimal_places=2)
    notes = models.TextField(blank=True)

    def __str__(self):
        return self.name


class MealPlan(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="meal_plans")
    age = models.PositiveSmallIntegerField()
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    disease = models.CharField(max_length=24)
    budget = models.DecimalField(max_digits=8, decimal_places=2)
    breakfast = models.CharField(max_length=255)
    lunch = models.CharField(max_length=255)
    dinner = models.CharField(max_length=255)
    nutrition_tips = models.JSONField(default=list)
    optimizer = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.user.email} meal plan"


class NutritionScore(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="nutrition_scores")
    meal_plan = models.OneToOneField(MealPlan, on_delete=models.CASCADE, related_name="score")
    score = models.PositiveSmallIntegerField()
    meal_quality = models.PositiveSmallIntegerField()
    disease_compatibility = models.PositiveSmallIntegerField()
    budget_efficiency = models.PositiveSmallIntegerField()
    notes = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-created_at",)

