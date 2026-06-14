import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";

import { AppButton } from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { Screen } from "../components/Screen";
import { RootStackParamList } from "../navigation/types";
import { useAuthStore } from "../store/authStore";
import { useLoading } from "../hooks/useLoading";
import { colors } from "../utils/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const { loading, run } = useLoading();

  const submit = () => run(async () => {
    try {
      await login(email, password);
      navigation.replace("Main");
    } catch {
      Alert.alert("Login failed", "Check your email and password.");
    }
  });

  return (
    <Screen>
      <Text style={styles.title}>Tena360 AI</Text>
      <Text style={styles.subtitle}>Sign in to your wellness workspace.</Text>
      <AppInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <AppInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <AppButton title="Login" onPress={submit} loading={loading} />
      <AppButton title="Create account" onPress={() => navigation.navigate("Register")} secondary />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.ink, fontSize: 34, fontWeight: "800", marginTop: 52 },
  subtitle: { color: colors.muted, fontSize: 16, marginBottom: 12 }
});
