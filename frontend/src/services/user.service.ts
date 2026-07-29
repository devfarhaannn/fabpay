import api from "./api";
import type { User } from "../types/user";



export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfileData {
  firstName: string;
  lastName: string;
  username: string;
  phone?: string;
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



export const getProfile = async () => {
  const response = await api.get("/auth/me");

  return response.data.data;
};



export const updateProfile = async (
  data: UpdateProfileData
) => {
  const response = await api.patch(
    "/auth/profile",
    data
  );

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