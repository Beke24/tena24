import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../utils/theme";

type Props<T extends string> = { options: T[]; value: T; onChange: (value: T) => void };

export function OptionGroup<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <View style={styles.row}>
      {options.map((option) => (
        <Pressable key={option} onPress={() => onChange(option)} style={[styles.option, value === option && styles.active]}>
          <Text style={[styles.text, value === option && styles.activeText]}>{option}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  option: { borderRadius: 8, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: colors.surface },
  active: { backgroundColor: colors.primary, borderColor: colors.primary },
  text: { color: colors.ink, textTransform: "capitalize", fontWeight: "600" },
  activeText: { color: "#fff" }
});
