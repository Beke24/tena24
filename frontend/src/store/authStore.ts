import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

import * as authService from "../services/auth";
import { User } from "../types";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  hydrated: false,
  hydrate: async () => {
    const [accessToken, refreshToken, userRaw] = await Promise.all([
      AsyncStorage.getItem("tena360.access"),
      AsyncStorage.getItem("tena360.refresh"),
      AsyncStorage.getItem("tena360.user")
    ]);
    set({ accessToken, refreshToken, user: userRaw ? JSON.parse(userRaw) : null, hydrated: true });
  },
  login: async (email, password) => {
    const data = await authService.login(email, password);
    await AsyncStorage.multiSet([
      ["tena360.access", data.access],
      ["tena360.refresh", data.refresh],
      ["tena360.user", JSON.stringify(data.user)]
    ]);
    set({ accessToken: data.access, refreshToken: data.refresh, user: data.user });
  },
  register: async (fullName, email, password) => {
    await authService.register(fullName, email, password);
    const data = await authService.login(email, password);
    await AsyncStorage.multiSet([
      ["tena360.access", data.access],
      ["tena360.refresh", data.refresh],
      ["tena360.user", JSON.stringify(data.user)]
    ]);
    set({ accessToken: data.access, refreshToken: data.refresh, user: data.user });
  },
  logout: async () => {
    await AsyncStorage.multiRemove(["tena360.access", "tena360.refresh", "tena360.user"]);
    set({ accessToken: null, refreshToken: null, user: null });
  }
}));
