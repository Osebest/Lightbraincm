import { configurePersist } from "zustand-persist";

export const { persist, purge } = configurePersist({
  storage: localStorage,
  rootKey: "root",
});
