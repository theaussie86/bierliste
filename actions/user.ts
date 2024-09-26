"use server";
import connectMongo from "@/libs/mongoose";
import User, { UserSchema } from "@/models/User";

export async function getUsers(users?: UserSchema[]) {
  await connectMongo();
  const query = users ? { _id: { $in: users } } : {};
  return User.find<UserSchema>(query);
}
