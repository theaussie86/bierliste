"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UpdateUserData, Users, init } from "@kinde/management-api-js";
import DbUser from "../models/User";
import connectMongo from "@/libs/mongoose";

export async function updateUserProfile(data: UpdateUserData) {
  try {
    // Update the user in the Kinde API
    init();
    await Users.updateUser(data);

    // Update the user in the database
    await connectMongo();
    const name =
      data.requestBody.given_name + " " + data.requestBody.family_name;
    const user = await DbUser.findOne({ kindeId: data.id });

    if (user) {
      await user.updateName(name);
    } else {
      await DbUser.create({ kindeId: data.id, name: name });
    }

    // Refresh the tokens
    const { refreshTokens } = getKindeServerSession();
    await refreshTokens();
  } catch (error) {
    console.error(error);
  }
}
