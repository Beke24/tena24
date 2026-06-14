from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True
    dependencies = [migrations.swappable_dependency(settings.AUTH_USER_MODEL)]
    operations = [
        migrations.CreateModel(
            name="EthiopianFood",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=80, unique=True)),
                ("category", models.CharField(max_length=40)),
                ("protein", models.BooleanField(default=False)),
                ("fiber", models.BooleanField(default=False)),
                ("vitamins", models.BooleanField(default=False)),
                ("estimated_cost_etb", models.DecimalField(decimal_places=2, max_digits=8)),
                ("notes", models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name="MealPlan",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("age", models.PositiveSmallIntegerField()),
                ("weight", models.DecimalField(decimal_places=2, max_digits=5)),
                ("disease", models.CharField(max_length=24)),
                ("budget", models.DecimalField(decimal_places=2, max_digits=8)),
                ("breakfast", models.CharField(max_length=255)),
                ("lunch", models.CharField(max_length=255)),
                ("dinner", models.CharField(max_length=255)),
                ("nutrition_tips", models.JSONField(default=list)),
                ("optimizer", models.JSONField(default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="meal_plans", to=settings.AUTH_USER_MODEL)),
            ],
            options={"ordering": ("-created_at",)},
        ),
        migrations.CreateModel(
            name="NutritionScore",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("score", models.PositiveSmallIntegerField()),
                ("meal_quality", models.PositiveSmallIntegerField()),
                ("disease_compatibility", models.PositiveSmallIntegerField()),
                ("budget_efficiency", models.PositiveSmallIntegerField()),
                ("notes", models.JSONField(default=list)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("meal_plan", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="score", to="nutrition.mealplan")),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="nutrition_scores", to=settings.AUTH_USER_MODEL)),
            ],
            options={"ordering": ("-created_at",)},
        ),
    ]
