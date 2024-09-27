"use Client";

import React from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useTeamStore } from "@/app/stores/providers/team-store-provider";

function ButtonChangeTeam() {
  const availableTeams = useTeamStore((state) => state.availableTeams);
  const setTeam = useTeamStore((state) => state.setTeam);
  const currentTeam = useTeamStore((state) => state.team);

  function handleTeamChange(teamId: string) {
    // handle team change
    setTeam(teamId);

    // close dropdown
    const dropdowns = document.querySelectorAll("details.dropdown");
    dropdowns?.forEach((d) => d.removeAttribute("open"));
  }

  if (availableTeams.length === 0) return null;
  if (availableTeams.length === 1) {
    setTeam(availableTeams[0].id);
  }

  return availableTeams.length > 1 ? (
    <details className="dropdown">
      <summary className="btn">
        {availableTeams.find((t) => t.id === currentTeam)?.name}
        <ChevronDownIcon className="size-5" />
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-secondary-content">
        {availableTeams
          .filter((t) => t.id !== currentTeam)
          .map((team) => (
            <li key={team.id}>
              <button
                onClick={() => handleTeamChange(team.id)}
                className="hover:bg-base-200 rounded-md p-2"
              >
                {team.name}
              </button>
            </li>
          ))}
      </ul>
    </details>
  ) : (
    <div>Team: {availableTeams.find((t) => t.id === currentTeam)?.name}</div>
  );
}

export default ButtonChangeTeam;
