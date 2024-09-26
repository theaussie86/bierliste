"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTeam } from "@/actions/team";

export const teamSchema = z.object({
  name: z
    .string()
    .min(2, "Teamname muss mindestens 2 Zeichen lang sein.")
    .max(255),
});

export type TeamSchema = z.infer<typeof teamSchema>;

function TeamsDialog() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TeamSchema>({
    resolver: zodResolver(teamSchema),
  });

  const onSubmit = async (data: Required<TeamSchema>) => {
    try {
      await createTeam(data);
    } catch (error) {
      console.error(error);
    }
    // Reset the form
    reset();

    // Close the modal
    const modal =
      document.querySelector<HTMLDialogElement>("#modal-teams-form");
    modal?.close();
  };
  return (
    <dialog
      id="modal-teams-form"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Team erstellen</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          method="dialog"
        >
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Name des Teams</span>
            </div>
            <input
              type="text"
              {...register("name")}
              placeholder="Teamnamen eingeben"
              className="input input-bordered w-full "
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.name ? errors.name.message : null}
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

export default TeamsDialog;
