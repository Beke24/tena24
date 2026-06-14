import json
import os

import requests

ETHIOPIAN_FOODS = ["Injera", "Shiro", "Lentils", "Eggs", "Chickpeas", "Cabbage", "Vegetables"]


def _fallback_plan(age, weight, disease, budget):
    budget = float(budget)
    protein = "eggs" if budget >= 120 else "lentils"
    breakfast = f"Injera with {protein} and cabbage"
    lunch = "Shiro with injera and cooked vegetables"
    dinner = "Chickpea stew with cabbage and vegetables"
    tips = [
        "Keep portions steady and include vegetables at every meal.",
        "Choose lentils, chickpeas, and eggs for affordable protein.",
        "Limit added salt and oil, especially with hypertension.",
    ]
    if disease == "diabetes":
        tips.append("Use smaller injera portions and pair carbs with protein and fiber.")
    if disease == "obesity":
        tips.append("Prioritize high-fiber stews and avoid sugary drinks.")
    optimizer = {
        "daily_budget_etb": budget,
        "affordable_meal_plan": [breakfast, lunch, dinner],
        "protein_sources": ["lentils", "chickpeas", protein],
        "fiber_sources": ["injera", "cabbage", "vegetables"],
        "vitamin_sources": ["cabbage", "vegetables"],
        "goal": "Maximum nutrition within the available Ethiopian daily budget.",
    }
    return {
        "breakfast": breakfast,
        "lunch": lunch,
        "dinner": dinner,
        "nutrition_tips": tips,
        "optimizer": optimizer,
    }


def generate_meal_plan(age, weight, disease, budget):
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return _fallback_plan(age, weight, disease, budget)

    prompt = {
        "role": "user",
        "content": (
            "Create an Ethiopian wellness meal plan as strict JSON with keys "
            "breakfast,lunch,dinner,nutrition_tips,optimizer. Use injera, shiro, "
            "lentils, eggs, chickpeas, cabbage, and vegetables. "
            f"User: age={age}, weight={weight}kg, disease={disease}, budget={budget} ETB/day."
        ),
    }
    response = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        json={
            "model": os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
            "messages": [
                {"role": "system", "content": "Return only valid JSON for an Ethiopian wellness MVP."},
                prompt,
            ],
            "response_format": {"type": "json_object"},
            "temperature": 0.3,
        },
        timeout=30,
    )
    response.raise_for_status()
    content = response.json()["choices"][0]["message"]["content"]
    return json.loads(content)


def calculate_nutrition_score(plan, disease):
    text = " ".join([plan.breakfast, plan.lunch, plan.dinner]).lower()
    quality = min(40, 10 + sum(6 for food in ["lentils", "eggs", "chickpea", "cabbage", "vegetable"] if food in text))
    compatibility = 30
    notes = []
    if disease == "diabetes" and "vegetable" in text:
        compatibility = 34
        notes.append("Balanced with fiber-rich foods.")
    if disease == "hypertension":
        compatibility = 32
        notes.append("Keep salt low in stews and sauces.")
    budget_efficiency = 26 if float(plan.budget) <= 150 else 22
    score = max(0, min(100, quality + compatibility + budget_efficiency))
    return {
        "score": score,
        "meal_quality": quality,
        "disease_compatibility": compatibility,
        "budget_efficiency": budget_efficiency,
        "notes": notes,
    }

