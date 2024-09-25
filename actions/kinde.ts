"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UpdateUserData, Users, init } from "@kinde/management-api-js";

export async function updateUserProfile(data: UpdateUserData) {
  try {
    init();
    await Users.updateUser(data);
    const { refreshTokens } = getKindeServerSession();
    await refreshTokens();
  } catch (error) {
    console.error(error);
  }
}
