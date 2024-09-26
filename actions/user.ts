"use server";
import connectMongo from "@/libs/mongoose";
import Team from "@/models/Team";
import User, { UserSchema } from "@/models/User";
import { Document } from "mongoose";

export async function getUsers(users?: UserSchema[]) {
  await connectMongo();
  const query = users ? { _id: { $in: users } } : {};
  return User.find<UserSchema>(query);
}

export async function getUserTeams(kindeId: string) {
  await connectMongo();
  // join teams with user
  const user = await User.findOne({ kindeId });
  const teams = await user.getTeams();

  return teams.map((team: Document) => team.toJSON());
}
