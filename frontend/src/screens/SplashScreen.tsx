import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { RootStackParamList } from "../navigation/types";
import { useAuthStore } from "../store/authStore";
import { colors } from "../utils/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export function SplashScreen({ navigation }: Props) {
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const timer = setTimeout(() => navigation.replace(accessToken ? "Main" : "Login"), 700);
    return () => clearTimeout(timer);
  }, [accessToken, navigation]);

  return (
    <View style={styles.wrap}>
      <Text style={styles.logo}>Tena360 AI</Text>
      <Text style={styles.copy}>Affordable nutrition, stress care, and wellness guidance for Ethiopia.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary, padding: 28 },
  logo: { color: "#fff", fontSize: 38, fontWeight: "800" },
  copy: { color: "#E9F4EE", textAlign: "center", marginTop: 12, fontSize: 16 }
});
