"use client";

import { createContext, useContext, useRef } from "react";
import { createTeamStore, TeamStore } from "../team-store";
import { useStore } from "zustand";

export type TeamStoreApi = ReturnType<typeof createTeamStore>;

export const TeamStoreContext = createContext<TeamStoreApi | undefined>(
  undefined
);

export interface TeamStoreProviderProps {
  children: React.ReactNode;
}

export const TeamStoreProvider = ({ children }: TeamStoreProviderProps) => {
  const storeRef = useRef<TeamStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createTeamStore();
  }

  return (
    <TeamStoreContext.Provider value={storeRef.current}>
      {children}
    </TeamStoreContext.Provider>
  );
};

export const useTeamStore = <T,>(selector: (store: TeamStore) => T) => {
  const store = useContext(TeamStoreContext);
  if (!store) {
    throw new Error("useTeamStore must be used within a TeamStoreProvider");
  }
  return useStore(store, selector);
};
