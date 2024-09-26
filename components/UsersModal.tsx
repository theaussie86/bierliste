"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/models/User";
import { addUsersToTeam } from "@/actions/team";
import { useParams } from "next/navigation";

const pickUsersSchema = z.object({
  users: z
    .array(z.string())
    .nonempty("Bitte wählen Sie mindestens einen Benutzer aus."),
});

type PickUsersSchema = z.infer<typeof pickUsersSchema>;

function UsersDialog({ users }: { users: { id: string; name: string }[] }) {
  const { teamId } = useParams();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PickUsersSchema>({
    resolver: zodResolver(pickUsersSchema),
  });

  const onSubmit = async (data: Required<PickUsersSchema>) => {
    try {
      if (!teamId || typeof teamId !== "string") {
        throw new Error("Team ID not found");
      }
      await addUsersToTeam(teamId, data.users);
    } catch (error) {
      console.error(error);
    }
    // Reset the form
    reset();

    // Close the modal
    const modal = document.querySelector<HTMLDialogElement>(
      "#modal-select-users"
    );
    modal?.close();
  };
  return (
    <dialog
      id="modal-select-users"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Mitglieder hinzufügen</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          method="dialog"
        >
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Benutzer auswählen</span>
            </div>
            <select {...register("users")} multiple className="select w-full">
              {users.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name || "Unbekannter Benutzer"}
                  </option>
                );
              })}
            </select>
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.users ? errors.users.message : null}
              </span>
            </div>
          </label>
          <button
            disabled={isSubmitting}
            className="btn btn-primary w-full"
            type="submit"
          >
            {isSubmitting ? "...Wird gespeichert" : "Speichern"}
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default UsersDialog;
