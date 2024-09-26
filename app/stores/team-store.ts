import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

type Team = {
  id: string;
  name: string;
};

export type TeamState = {
  team: string | null;
  availableTeams: Team[];
};

export type TeamAction = {
  setTeam: (team: string | null) => void;
  setAvailableTeams: (teams: Team[]) => void;
};

export type TeamStore = TeamState & TeamAction;

const defaultInitialState: TeamState = {
  team: null,
  availableTeams: [],
};

export const createTeamStore = (initialState = defaultInitialState) => {
  return createStore<TeamStore>()(
    persist(
      (set) => ({
        ...initialState,
        setTeam: (team) => set({ team }),
        setAvailableTeams: (availableTeams) => set({ availableTeams }),
      }),
      {
        name: "team-store",
      }
    )
  );
};
