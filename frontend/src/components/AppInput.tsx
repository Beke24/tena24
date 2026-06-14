import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";

import { colors } from "../utils/theme";

type Props = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
};

export function AppInput(props: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        value={props.value}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  label: { color: colors.ink, fontWeight: "700" },
  input: { minHeight: 48, borderRadius: 8, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: 14, color: colors.ink }
});
