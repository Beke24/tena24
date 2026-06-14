import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { Screen } from "../components/Screen";
import { colors } from "../utils/theme";

const phases = [
  { label: "Inhale", seconds: 4, scale: 1.35 },
  { label: "Hold", seconds: 4, scale: 1.35 },
  { label: "Exhale", seconds: 6, scale: 0.85 }
];

export function BreathingExerciseScreen() {
  const scale = useRef(new Animated.Value(0.85)).current;
  const [running, setRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [remaining, setRemaining] = useState(phases[0].seconds);

  useEffect(() => {
    if (!running) return;
    const phase = phases[phaseIndex];
    Animated.timing(scale, { toValue: phase.scale, duration: phase.seconds * 1000, useNativeDriver: true }).start();
    setRemaining(phase.seconds);
    const interval = setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000);
    const timeout = setTimeout(() => setPhaseIndex((index) => (index + 1) % phases.length), phase.seconds * 1000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [phaseIndex, running, scale]);

  return (
    <Screen scroll={false}>
      <View style={styles.wrap}>
        <Text style={styles.title}>Breathing Exercise</Text>
        <Animated.View style={[styles.circle, { transform: [{ scale }] }]}>
          <Text style={styles.phase}>{phases[phaseIndex].label}</Text>
          <Text style={styles.timer}>{remaining}s</Text>
        </Animated.View>
        <Text style={styles.flow}>Inhale 4 sec  |  Hold 4 sec  |  Exhale 6 sec</Text>
        <AppButton title={running ? "Pause" : "Start"} onPress={() => setRunning((value) => !value)} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", gap: 28 },
  title: { color: colors.ink, fontSize: 28, fontWeight: "800" },
  circle: { width: 190, height: 190, borderRadius: 95, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary },
  phase: { color: "#fff", fontSize: 28, fontWeight: "800" },
  timer: { color: "#fff", fontSize: 20, marginTop: 6 },
  flow: { color: colors.muted, textAlign: "center" }
});
