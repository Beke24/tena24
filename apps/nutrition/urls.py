from django.urls import path

from .views import MealPlanView

urlpatterns = [path("meal-plan", MealPlanView.as_view(), name="meal-plan")]
