import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AIChatScreen } from "../screens/AIChatScreen";
import { BreathingExerciseScreen } from "../screens/BreathingExerciseScreen";
import { DashboardScreen } from "../screens/DashboardScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { MealPlanScreen } from "../screens/MealPlanScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { SplashScreen } from "../screens/SplashScreen";
import { StressAssessmentScreen } from "../screens/StressAssessmentScreen";
import { useAuthStore } from "../store/authStore";
import { colors } from "../utils/theme";
import { MainTabParamList, RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { minHeight: 62, paddingBottom: 8, paddingTop: 8 }
      }}
    >
      <Tabs.Screen name="Dashboard" component={DashboardScreen} />
      <Tabs.Screen name="MealPlan" component={MealPlanScreen} options={{ title: "Meals" }} />
      <Tabs.Screen name="Stress" component={StressAssessmentScreen} />
      <Tabs.Screen name="Chat" component={AIChatScreen} />
      <Tabs.Screen name="Breathing" component={BreathingExerciseScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  const accessToken = useAuthStore((state) => state.accessToken);
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      {accessToken ? (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
