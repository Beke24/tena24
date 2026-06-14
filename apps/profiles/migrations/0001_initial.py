from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True
    dependencies = [migrations.swappable_dependency(settings.AUTH_USER_MODEL)]
    operations = [
        migrations.CreateModel(
            name="HealthProfile",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("age", models.PositiveSmallIntegerField()),
                ("gender", models.CharField(choices=[("female", "Female"), ("male", "Male"), ("other", "Other")], max_length=16)),
                ("weight", models.DecimalField(decimal_places=2, max_digits=5)),
                ("height", models.DecimalField(decimal_places=2, max_digits=5)),
                ("daily_budget", models.DecimalField(decimal_places=2, max_digits=8)),
                ("activity_level", models.CharField(choices=[("low", "Low"), ("moderate", "Moderate"), ("high", "High")], max_length=16)),
                ("disease", models.CharField(choices=[("diabetes", "Diabetes"), ("hypertension", "Hypertension"), ("obesity", "Obesity"), ("none", "None")], default="none", max_length=24)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("user", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="health_profile", to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
