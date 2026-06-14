import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { RootNavigator } from "./src/navigation/RootNavigator";
import { useAuthStore } from "./src/store/authStore";
import { colors } from "./src/utils/theme";

export default function App() {
  const hydrate = useAuthStore((state) => state.hydrate);
  const hydrated = useAuthStore((state) => state.hydrated);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!hydrated) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <RootNavigator />
    </NavigationContainer>
  );
}
