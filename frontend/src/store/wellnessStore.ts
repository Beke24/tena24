import { create } from "zustand";

import { getDashboard } from "../services/wellness";
import { Dashboard } from "../types";

type WellnessState = {
  dashboard: Dashboard | null;
  loadDashboard: () => Promise<void>;
};

export const useWellnessStore = create<WellnessState>((set) => ({
  dashboard: null,
  loadDashboard: async () => {
    const dashboard = await getDashboard();
    set({ dashboard });
  }
}));
