"use client";

import { PencilIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { teamSchema, TeamSchema } from "./TeamsModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { updateTeam } from "@/actions/team";
import { useParams } from "next/navigation";

function TeamName({ team }: { team: string }) {
  const { teamId } = useParams();

  const [edit, setEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<TeamSchema>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: team,
    },
  });

  async function onSubmit(data: TeamSchema) {
    try {
      if (!teamId || typeof teamId !== "string") {
        throw new Error("Team ID not found");
      }
      await updateTeam(teamId, { name: data?.name });
      setEdit(false);
    } catch (error) {
      console.error(error);
    }
  }

  function toggleEdit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setEdit((prev) => !prev);
  }

  return (
    <div className="flex justify-between gap-x-4 text-2xl">
      {edit ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Name des Teams</span>
            </div>
            <input
              {...register("name", { required: true })}
              className={cn("input input-bordered w-full", {
                "input-error": errors?.name,
              })}
              onBlur={handleSubmit(onSubmit)}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.name?.message}
              </span>
            </div>
          </label>
          <button
            disabled={!isDirty}
            type="submit"
            hidden
            className="btn btn-primary"
          >
            Speichern
          </button>
        </form>
      ) : (
        <h2>{team}</h2>
      )}
      <span
        className="tooltip"
        data-tip={edit ? "Bearbeitung abbrechen" : "Namen des Teams ändern"}
      >
        <button type="button" onClick={toggleEdit}>
          {edit ? (
            <XMarkIcon className="size-6" />
          ) : (
            <PencilIcon className="size-6" />
          )}
        </button>
      </span>
    </div>
  );
}

export default TeamName;
