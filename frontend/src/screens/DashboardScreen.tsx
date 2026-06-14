import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Screen } from "../components/Screen";
import { useWellnessStore } from "../store/wellnessStore";
import { colors } from "../utils/theme";

export function DashboardScreen() {
  const dashboard = useWellnessStore((state) => state.dashboard);
  const loadDashboard = useWellnessStore((state) => state.loadDashboard);

  useFocusEffect(useCallback(() => { loadDashboard(); }, [loadDashboard]));

  return (
    <Screen>
      <Text style={styles.title}>Today</Text>
      <View style={styles.grid}>
        <View style={styles.metric}><Text style={styles.metricValue}>{dashboard?.nutrition_score ?? 0}</Text><Text>Nutrition Score</Text></View>
        <View style={styles.metric}><Text style={styles.metricValue}>{dashboard?.stress_score ?? 0}</Text><Text>Stress Score</Text></View>
      </View>
      <View style={styles.panel}>
        <Text style={styles.heading}>Today's Meal Plan</Text>
        <Text>Breakfast: {dashboard?.today_meal_plan?.breakfast ?? "Generate a plan to begin."}</Text>
        <Text>Lunch: {dashboard?.today_meal_plan?.lunch ?? "-"}</Text>
        <Text>Dinner: {dashboard?.today_meal_plan?.dinner ?? "-"}</Text>
      </View>
      <View style={styles.panel}>
        <Text style={styles.heading}>Wellness Recommendations</Text>
        {(dashboard?.wellness_recommendations ?? ["Complete your profile, meal plan, and stress check."]).map((item) => <Text key={item}>• {item}</Text>)}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.ink, fontSize: 32, fontWeight: "800" },
  grid: { flexDirection: "row", gap: 12 },
  metric: { flex: 1, backgroundColor: colors.surface, borderRadius: 8, padding: 16, borderWidth: 1, borderColor: colors.border },
  metricValue: { color: colors.primary, fontSize: 30, fontWeight: "800" },
  panel: { backgroundColor: colors.surface, borderRadius: 8, padding: 16, gap: 8, borderWidth: 1, borderColor: colors.border },
  heading: { fontSize: 18, fontWeight: "800", color: colors.ink }
});
