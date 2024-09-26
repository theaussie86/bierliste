"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { updateUserProfile } from "@/actions/kinde";

const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, "Vorname muss mindestens 2 Zeichen lang sein.")
    .max(255),
  lastName: z
    .string()
    .min(2, "Nachname muss mindestens 2 Zeichen lang sein.")
    .max(255),
});

type ProfileSchema = z.infer<typeof profileSchema>;

function ProfileModal({
  user,
}: {
  user: { given_name: string; family_name: string; id: string };
}) {
  console.log(user);
  const { refreshData } = useKindeBrowserClient();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.given_name,
      lastName: user?.family_name,
    },
  });

  const onSubmit = async (data: ProfileSchema) => {
    try {
      // Update the user
      await updateUserProfile({
        id: user?.id,
        requestBody: {
          given_name: data.firstName,
          family_name: data.lastName,
        },
      }).then(() => refreshData());
    } catch (error) {
      console.error(error);
    }
    // Reset the form
    reset();

    // Close the modal
    const modal = document.querySelector<HTMLDialogElement>("#modal-form");
    modal?.close();
  };

  return (
    <dialog id="modal-form" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Namen ändern</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          method="dialog"
        >
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Vorname</span>
            </div>
            <input
              type="text"
              {...register("firstName")}
              placeholder="Vornamen eingeben"
              className="input input-bordered w-full "
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.firstName ? errors.firstName.message : null}
              </span>
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Nachname</span>
            </div>
            <input
              type="text"
              {...register("lastName")}
              placeholder="Nachnamen eingeben"
              className="input input-bordered w-full "
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.lastName ? errors.lastName.message : null}
              </span>
            </div>
          </label>
          <button
            disabled={isSubmitting}
            className="btn btn-primary w-full"
            type="submit"
          >
            {isSubmitting ? "...Wird geschickt" : "Speichern"}
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default ProfileModal;
