import { useState } from "react";
import { Alert, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { OptionGroup } from "../components/OptionGroup";
import { Screen } from "../components/Screen";
import { assessStress } from "../services/wellness";
import { StressAssessment } from "../types";

export function StressAssessmentScreen() {
  const [stressLevel, setStressLevel] = useState("5");
  const [sleepQuality, setSleepQuality] = useState<"good" | "average" | "poor">("average");
  const [energyLevel, setEnergyLevel] = useState<"high" | "medium" | "low">("medium");
  const [result, setResult] = useState<StressAssessment | null>(null);

  const submit = async () => {
    try {
      setResult(await assessStress({ stress_level: Number(stressLevel), sleep_quality: sleepQuality, energy_level: energyLevel }));
    } catch {
      Alert.alert("Stress assessment failed", "Try again after checking the backend.");
    }
  };

  return (
    <Screen>
      <Text style={{ fontSize: 28, fontWeight: "800" }}>Stress Assessment</Text>
      <AppInput label="Stress Level (1-10)" value={stressLevel} onChangeText={setStressLevel} keyboardType="numeric" />
      <Text style={{ fontWeight: "700" }}>Sleep Quality</Text>
      <OptionGroup options={["good", "average", "poor"]} value={sleepQuality} onChange={setSleepQuality} />
      <Text style={{ fontWeight: "700" }}>Energy Level</Text>
      <OptionGroup options={["high", "medium", "low"]} value={energyLevel} onChange={setEnergyLevel} />
      <AppButton title="Calculate stress" onPress={submit} />
      {result && <View><Text style={{ fontSize: 22, fontWeight: "800" }}>{result.result}</Text><Text>Score: {result.score}/100</Text></View>}
    </Screen>
  );
}
