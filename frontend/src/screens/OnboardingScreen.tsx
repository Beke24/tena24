import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Text } from "react-native";

import { AppButton } from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { OptionGroup } from "../components/OptionGroup";
import { Screen } from "../components/Screen";
import { RootStackParamList } from "../navigation/types";
import { saveProfile } from "../services/wellness";
import { ActivityLevel, Disease, Gender } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Onboarding">;

export function OnboardingScreen({ navigation }: Props) {
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState<Gender>("female");
  const [weight, setWeight] = useState("65");
  const [height, setHeight] = useState("170");
  const [dailyBudget, setDailyBudget] = useState("150");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [disease, setDisease] = useState<Disease>("none");

  const submit = async () => {
    try {
      await saveProfile({ age: Number(age), gender, weight, height, daily_budget: dailyBudget, activity_level: activityLevel, disease });
      navigation.replace("Main");
    } catch {
      Alert.alert("Profile error", "Please review your health profile details.");
    }
  };

  return (
    <Screen>
      <Text style={{ fontSize: 28, fontWeight: "800" }}>Health profile</Text>
      <AppInput label="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
      <Text style={{ fontWeight: "700" }}>Gender</Text>
      <OptionGroup options={["female", "male", "other"]} value={gender} onChange={setGender} />
      <AppInput label="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="decimal-pad" />
      <AppInput label="Height (cm)" value={height} onChangeText={setHeight} keyboardType="decimal-pad" />
      <AppInput label="Daily Budget (ETB)" value={dailyBudget} onChangeText={setDailyBudget} keyboardType="decimal-pad" />
      <Text style={{ fontWeight: "700" }}>Activity Level</Text>
      <OptionGroup options={["low", "moderate", "high"]} value={activityLevel} onChange={setActivityLevel} />
      <Text style={{ fontWeight: "700" }}>Disease</Text>
      <OptionGroup options={["diabetes", "hypertension", "obesity", "none"]} value={disease} onChange={setDisease} />
      <AppButton title="Save profile" onPress={submit} />
    </Screen>
  );
}
