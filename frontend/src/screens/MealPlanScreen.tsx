import { useState } from "react";
import { Alert, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { OptionGroup } from "../components/OptionGroup";
import { Screen } from "../components/Screen";
import { createMealPlan } from "../services/wellness";
import { Disease, MealPlan } from "../types";

export function MealPlanScreen() {
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("65");
  const [disease, setDisease] = useState<Disease>("none");
  const [budget, setBudget] = useState("150");
  const [plan, setPlan] = useState<MealPlan | null>(null);

  const generate = async () => {
    try {
      setPlan(await createMealPlan({ age: Number(age), weight, disease, budget }));
    } catch {
      Alert.alert("Meal plan failed", "Check your inputs and try again.");
    }
  };

  return (
    <Screen>
      <Text style={{ fontSize: 28, fontWeight: "800" }}>AI Nutrition</Text>
      <AppInput label="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
      <AppInput label="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="decimal-pad" />
      <AppInput label="Budget (ETB/day)" value={budget} onChangeText={setBudget} keyboardType="decimal-pad" />
      <Text style={{ fontWeight: "700" }}>Disease</Text>
      <OptionGroup options={["diabetes", "hypertension", "obesity", "none"]} value={disease} onChange={setDisease} />
      <AppButton title="Generate meal plan" onPress={generate} />
      {plan && (
        <View style={{ gap: 8 }}>
          <Text>Breakfast: {plan.breakfast}</Text>
          <Text>Lunch: {plan.lunch}</Text>
          <Text>Dinner: {plan.dinner}</Text>
          <Text>Score: {plan.score?.score ?? 0}/100</Text>
          {plan.nutrition_tips.map((tip) => <Text key={tip}>• {tip}</Text>)}
        </View>
      )}
    </Screen>
  );
}
