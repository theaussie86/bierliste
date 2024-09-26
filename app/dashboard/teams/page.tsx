import { deleteTeam, getTeams } from "@/actions/team";
import OpenModalButton from "@/components/OpenModalButton";
import TeamsDialog from "@/components/TeamsModal";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/16/solid";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function TeamsPage() {
  const { isAuthenticated, getAccessToken } = getKindeServerSession();
  const teams = await getTeams();

  const handleDeleteTeam = async (formdata: FormData) => {
    "use server";
    await deleteTeam(formdata.get("id").toString());
  };

  if (!(await isAuthenticated())) {
    redirect("/login");
  }
  const { roles } = await getAccessToken();

  if (!roles.map((r) => r.key).includes("admin")) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between align-bottom">
        <h1 className="text-3xl md:text-4xl font-extrabold">Teams</h1>
        <OpenModalButton
          className="btn btn-sm btn-primary text-primary-content hover:text-primary-content/60"
          selector="#modal-teams-form"
          title="Team hinzufügen"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Key</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id}>
                <td>{team.name}</td>
                <td>{team.key}</td>
                <td className="flex gap-x-2">
                  <Link
                    href={`/dashboard/teams/${team._id}`}
                    className="text-primary hover:text-primary/60"
                  >
                    <PencilIcon className="size-6" />
                  </Link>
                  <form action={handleDeleteTeam}>
                    <input
                      type="hidden"
                      name="id"
                      value={team._id.toString()}
                    />
                    <button type="submit">
                      <TrashIcon className="size-6" />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TeamsDialog />
    </div>
  );
}

export default TeamsPage;
