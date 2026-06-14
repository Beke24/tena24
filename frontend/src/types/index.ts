export type Disease = "diabetes" | "hypertension" | "obesity" | "none";
export type ActivityLevel = "low" | "moderate" | "high";
export type Gender = "female" | "male" | "other";

export type User = { id: number; full_name: string; email: string };

export type HealthProfile = {
  id?: number;
  age: number;
  gender: Gender;
  weight: string;
  height: string;
  daily_budget: string;
  activity_level: ActivityLevel;
  disease: Disease;
};

export type MealPlan = {
  id: number;
  breakfast: string;
  lunch: string;
  dinner: string;
  nutrition_tips: string[];
  optimizer: {
    affordable_meal_plan?: string[];
    protein_sources?: string[];
    fiber_sources?: string[];
    vitamin_sources?: string[];
    daily_budget_etb?: number;
  };
  score?: {
    score: number;
    meal_quality: number;
    disease_compatibility: number;
    budget_efficiency: number;
    notes: string[];
  };
};

export type StressAssessment = {
  id: number;
  stress_level: number;
  sleep_quality: "good" | "average" | "poor";
  energy_level: "high" | "medium" | "low";
  result: string;
  score: number;
};

export type Dashboard = {
  profile: HealthProfile | null;
  nutrition_score: number;
  stress_score: number;
  today_meal_plan: MealPlan | null;
  latest_stress: StressAssessment | null;
  wellness_recommendations: string[];
};
