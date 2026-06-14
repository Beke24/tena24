from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True
    dependencies = [migrations.swappable_dependency(settings.AUTH_USER_MODEL)]
    operations = [
        migrations.CreateModel(
            name="StressAssessment",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("stress_level", models.PositiveSmallIntegerField()),
                ("sleep_quality", models.CharField(choices=[("good", "Good"), ("average", "Average"), ("poor", "Poor")], max_length=16)),
                ("energy_level", models.CharField(choices=[("high", "High"), ("medium", "Medium"), ("low", "Low")], max_length=16)),
                ("result", models.CharField(max_length=24)),
                ("score", models.PositiveSmallIntegerField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="stress_assessments", to=settings.AUTH_USER_MODEL)),
            ],
            options={"ordering": ("-created_at",)},
        ),
    ]
