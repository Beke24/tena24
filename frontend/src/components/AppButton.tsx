import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { colors } from "../utils/theme";

type Props = { title: string; onPress: () => void; loading?: boolean; secondary?: boolean };

export function AppButton({ title, onPress, loading, secondary }: Props) {
  return (
    <Pressable style={[styles.button, secondary && styles.secondary]} onPress={onPress} disabled={loading}>
      {loading ? <ActivityIndicator color={secondary ? colors.primary : "#fff"} /> : <Text style={[styles.text, secondary && styles.secondaryText]}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 48, borderRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary, paddingHorizontal: 16 },
  secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  text: { color: "#fff", fontSize: 16, fontWeight: "700" },
  secondaryText: { color: colors.primary }
});
