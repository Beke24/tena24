import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";

import { AppButton } from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { Screen } from "../components/Screen";
import { RootStackParamList } from "../navigation/types";
import { useLoading } from "../hooks/useLoading";
import { useAuthStore } from "../store/authStore";
import { colors } from "../utils/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export function RegisterScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = useAuthStore((state) => state.register);
  const { loading, run } = useLoading();

  const submit = () => run(async () => {
    try {
      await register(fullName, email, password);
      navigation.replace("Onboarding");
    } catch {
      Alert.alert("Registration failed", "Please check the fields and try again.");
    }
  });

  return (
    <Screen>
      <Text style={styles.title}>Create account</Text>
      <AppInput label="Full Name" value={fullName} onChangeText={setFullName} />
      <AppInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <AppInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <AppButton title="Register" onPress={submit} loading={loading} />
      <AppButton title="Back to login" onPress={() => navigation.goBack()} secondary />
    </Screen>
  );
}

const styles = StyleSheet.create({ title: { color: colors.ink, fontSize: 30, fontWeight: "800", marginTop: 52 } });
