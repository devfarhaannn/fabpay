import api from "./api";
import type { User } from "../types/user";

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const searchUsers = async (
  query: string
): Promise<User[]> => {
  const response = await api.get("/users/search", {
    params: {
      query,
    },
  });

  return response.data.data;
};

export const changePassword = async (
  data: ChangePasswordData
) => {
  const response = await api.patch(
    "/users/change-password",
    data
  );

  return response.data;
};