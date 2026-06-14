import AsyncStorage from "@react-native-async-storage/async-storage";

import { ethiopianFoods, storageKeys } from "../data/ethiopianFoods";
import { Dashboard, HealthProfile, MealPlan, StressAssessment } from "../types";

async function readJson<T>(key: string, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : fallback;
}

export async function getProfile() {
  return readJson<HealthProfile | null>(storageKeys.profile, null);
}

export async function saveProfile(profile: HealthProfile) {
  const saved = { ...profile, id: profile.id ?? Date.now() };
  await AsyncStorage.setItem(storageKeys.profile, JSON.stringify(saved));
  return saved;
}

export async function createMealPlan(input: { age: number; weight: string; disease: string; budget: string }) {
  const budget = Number(input.budget);
  const protein = budget >= 130 ? "eggs" : "lentils";
  const breakfast = `Injera with ${protein} and cabbage`;
  const lunch = "Shiro with injera and cooked vegetables";
  const dinner = "Chickpea stew with cabbage and vegetables";
  const mealQuality = 40;
  const diseaseCompatibility = input.disease === "diabetes" ? 30 : input.disease === "hypertension" ? 32 : 34;
  const budgetEfficiency = budget <= 150 ? 26 : 22;
  const plan: MealPlan = {
    id: Date.now(),
    breakfast,
    lunch,
    dinner,
    nutrition_tips: [
      "Use lentils, chickpeas, and eggs for affordable protein.",
      "Add cabbage or seasonal vegetables to every meal.",
      input.disease === "diabetes" ? "Keep injera portions steady and pair carbs with protein." : "Keep salt and oil moderate in stews."
    ],
    optimizer: {
      daily_budget_etb: budget,
      affordable_meal_plan: [breakfast, lunch, dinner],
      protein_sources: ethiopianFoods.filter((food) => food.protein).map((food) => food.name),
      fiber_sources: ethiopianFoods.filter((food) => food.fiber).map((food) => food.name),
      vitamin_sources: ethiopianFoods.filter((food) => food.vitamins).map((food) => food.name)
    },
    score: {
      score: Math.min(100, mealQuality + diseaseCompatibility + budgetEfficiency),
      meal_quality: mealQuality,
      disease_compatibility: diseaseCompatibility,
      budget_efficiency: budgetEfficiency,
      notes: ["Local MVP score based on meal quality, disease compatibility, and budget efficiency."]
    }
  };
  const plans = await readJson<MealPlan[]>(storageKeys.mealPlans, []);
  await AsyncStorage.setItem(storageKeys.mealPlans, JSON.stringify([plan, ...plans]));
  return plan;
}

export async function assessStress(input: { stress_level: number; sleep_quality: string; energy_level: string }) {
  let score = input.stress_level * 7;
  score += { good: 0, average: 12, poor: 24 }[input.sleep_quality as "good" | "average" | "poor"];
  score += { high: 0, medium: 10, low: 20 }[input.energy_level as "high" | "medium" | "low"];
  score = Math.min(100, score);
  const result = score < 35 ? "Low Stress" : score < 70 ? "Moderate Stress" : "High Stress";
  const assessment: StressAssessment = {
    id: Date.now(),
    stress_level: input.stress_level,
    sleep_quality: input.sleep_quality as StressAssessment["sleep_quality"],
    energy_level: input.energy_level as StressAssessment["energy_level"],
    result,
    score
  };
  const history = await readJson<StressAssessment[]>(storageKeys.stress, []);
  await AsyncStorage.setItem(storageKeys.stress, JSON.stringify([assessment, ...history]));
  return assessment;
}

export async function sendChat(message: string) {
  const lower = message.toLowerCase();
  const response = lower.includes("sleep")
    ? "Try the 4-4-6 breathing guide, reduce screen time before bed, and choose a light dinner."
    : lower.includes("stress")
      ? "Pause for two breathing cycles, drink water, and write down the next one practical task."
      : lower.includes("food") || lower.includes("healthy")
        ? "Combine injera with shiro or lentils, add cabbage, and use eggs when the budget allows."
        : "Pick one small wellness action now: food, sleep, movement, or breathing.";
  const chat = { id: Date.now(), message, response, created_at: new Date().toISOString() };
  const history = await readJson<typeof chat[]>(storageKeys.chat, []);
  await AsyncStorage.setItem(storageKeys.chat, JSON.stringify([...history, chat]));
  return chat;
}

export async function getDashboard() {
  const profile = await getProfile();
  const mealPlans = await readJson<MealPlan[]>(storageKeys.mealPlans, []);
  const stressHistory = await readJson<StressAssessment[]>(storageKeys.stress, []);
  const todayMealPlan = mealPlans[0] ?? null;
  const latestStress = stressHistory[0] ?? null;
  const nutritionScore = todayMealPlan?.score?.score ?? 0;
  const stressScore = latestStress?.score ?? 0;
  const recommendations = [
    nutritionScore < 70 ? "Generate a meal plan with one protein and one vegetable source." : "Repeat today's balanced meal rhythm.",
    stressScore >= 70 ? "Use the breathing guide before sleep today." : "Keep one short breathing break in the afternoon."
  ];
  const dashboard: Dashboard = {
    profile,
    nutrition_score: nutritionScore,
    stress_score: stressScore,
    today_meal_plan: todayMealPlan,
    latest_stress: latestStress,
    wellness_recommendations: recommendations
  };
  return dashboard;
}
