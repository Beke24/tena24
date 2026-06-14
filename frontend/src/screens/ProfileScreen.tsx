import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { Screen } from "../components/Screen";
import { getProfile } from "../services/wellness";
import { useAuthStore } from "../store/authStore";
import { HealthProfile } from "../types";

export function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [profile, setProfile] = useState<HealthProfile | null>(null);

  useFocusEffect(useCallback(() => { getProfile().then(setProfile).catch(() => setProfile(null)); }, []));

  return (
    <Screen>
      <Text style={{ fontSize: 28, fontWeight: "800" }}>Profile</Text>
      <View style={{ gap: 8 }}>
        <Text>Name: {user?.full_name}</Text>
        <Text>Email: {user?.email}</Text>
        <Text>Age: {profile?.age ?? "-"}</Text>
        <Text>Budget: {profile?.daily_budget ?? "-"} ETB/day</Text>
        <Text>Disease: {profile?.disease ?? "-"}</Text>
      </View>
      <AppButton title="Logout" onPress={logout} secondary />
    </Screen>
  );
}
