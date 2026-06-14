from django.core.management.base import BaseCommand

from apps.nutrition.models import EthiopianFood


FOODS = [
    ("Injera", "carbohydrate", False, True, False, 35, "Fermented teff flatbread; moderate portions support blood sugar control."),
    ("Shiro", "legume", True, True, False, 55, "Affordable chickpea stew; watch salt and oil."),
    ("Lentils", "legume", True, True, False, 45, "Low-cost protein and fiber source."),
    ("Eggs", "protein", True, False, True, 25, "Dense protein; useful when budget allows."),
    ("Chickpeas", "legume", True, True, False, 50, "Protein and fiber for satiety."),
    ("Cabbage", "vegetable", False, True, True, 20, "Affordable vegetable and fiber source."),
    ("Vegetables", "vegetable", False, True, True, 30, "Micronutrient source; choose local seasonal options."),
]


class Command(BaseCommand):
    help = "Seed Ethiopian foods used by the Tena360 AI MVP."

    def handle(self, *args, **options):
        for name, category, protein, fiber, vitamins, cost, notes in FOODS:
            EthiopianFood.objects.update_or_create(
                name=name,
                defaults={
                    "category": category,
                    "protein": protein,
                    "fiber": fiber,
                    "vitamins": vitamins,
                    "estimated_cost_etb": cost,
                    "notes": notes,
                },
            )
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(FOODS)} Ethiopian foods."))
