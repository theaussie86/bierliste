import { UpdateUserData, Users } from "@kinde/management-api-js";

export async function updateFirstName(data: UpdateUserData) {
  try {
    await Users.updateUser(data);
  } catch (error) {
    console.error(error);
  }
}
