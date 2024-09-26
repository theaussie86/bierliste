import { deleteUserFromTeam, getTeam } from "@/actions/team";
import { getUsers } from "@/actions/user";
import OpenModalButton from "@/components/OpenModalButton";
import TeamName from "@/components/TeamName";
import UsersDialog from "@/components/UsersModal";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";

async function TeamDetailsPage({ params }: { params: { teamId: string } }) {
  const team = await getTeam(params.teamId);
  const { users: teamUsers, name } = team;
  const allUsers = await getUsers();
  const users = allUsers.filter((user) => teamUsers.includes(user._id));
  const notUsers = allUsers.filter((user) => !teamUsers.includes(user._id));

  const handleDeleteUser = async (formdata: FormData) => {
    "use server";
    await deleteUserFromTeam(params.teamId, formdata.get("id").toString());
  };
  return (
    <div className="space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold">Team Mitglieder</h1>
      <TeamName team={name} />

      {notUsers.length ? (
        <div className="flex justify-end">
          <OpenModalButton
            className="btn btn-sm btn-primary text-primary-content hover:text-primary-content/60"
            selector="#modal-select-users"
            title="Mitglieder hinzufügen"
          />
        </div>
      ) : null}
      <div className="overflow-x-auto mt-6">
        {users.length ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id.toString()}>
                  <td>{user.name || "Unbekannter Benutzer"}</td>
                  <td>
                    <form action={handleDeleteUser}>
                      <input
                        type="hidden"
                        name="id"
                        value={user._id.toString()}
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
        ) : (
          <p>Keine Mitglieder vorhanden</p>
        )}
      </div>
      <UsersDialog
        users={notUsers.map((u) => ({ id: u._id.toString(), name: u.name }))}
      />
    </div>
  );
}

export default TeamDetailsPage;
