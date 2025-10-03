import { create } from "zustand";
import { combine } from "zustand/middleware";
import { persist } from "./persist";

export type ThemeType = "light" | "dark";
const defaultState: {
  theme: ThemeType;
  collapsed: boolean;
  toggled: boolean;
} = {
  theme: "light",
  collapsed: false,
  toggled: false,
};

// Global State Store for theme and other global states
export const useGlobalState = create(
  persist(
    {
      key: "global",
    },
    combine(defaultState, (set) => ({
      setTheme: (theme: ThemeType) => set((state) => ({ ...state, theme })),
      setCollapsed: (collapsed: boolean) =>
        set((state) => ({ ...state, collapsed })),
      setToggled: (toggled: boolean) => set((state) => ({ ...state, toggled })),
    }))
  )
);
