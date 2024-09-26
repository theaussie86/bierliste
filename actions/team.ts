"use server";

import connectMongo from "@/libs/mongoose";
import Team, { TeamSchema } from "@/models/Team";
import { revalidatePath } from "next/cache";

export async function createTeam(team: Pick<TeamSchema, "name">) {
  await connectMongo();
  await Team.create(team);
  revalidatePath("/dashboard/teams");
}

export async function updateTeam(id: string, data: Pick<TeamSchema, "name">) {
  await connectMongo();
  await Team.findByIdAndUpdate(id, data);
  revalidatePath(`/dashboard/teams/${id}`);
}

export async function getTeams() {
  await connectMongo();
  return Team.find();
}

export async function getTeam(id: string) {
  await connectMongo();
  return Team.findOne({ _id: id });
}

export async function deleteTeam(id: string) {
  await connectMongo();
  await Team.findByIdAndDelete(id);
  revalidatePath("/dashboard/teams");
}

export async function deleteUserFromTeam(teamId: string, userId: string) {
  await connectMongo();
  await Team.findByIdAndUpdate(teamId, {
    $pull: { users: userId },
  });
  revalidatePath(`/dashboard/teams/${teamId}`);
}

export async function addUsersToTeam(teamId: string, userIds: string[]) {
  await connectMongo();
  await Team.findByIdAndUpdate(teamId, {
    $push: { users: userIds },
  });
  revalidatePath(`/dashboard/teams/${teamId}`);
}
