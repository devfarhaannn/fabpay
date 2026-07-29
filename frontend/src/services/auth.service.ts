import api from "./api";
import { storage } from "../utils/storage";
import type { User } from "../types/user";



export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface UpdateProfileData {
  firstName: string;
  lastName: string;
  username: string;
  phone?: string;
}



export const signup = async (
  data: SignupData
) => {
  const response = await api.post(
    "/auth/signup",
    data
  );

  storage.setToken(
    response.data.data.token
  );

  return response.data.data;
};



export const login = async (
  data: LoginData
) => {
  const response = await api.post(
    "/auth/signin",
    data
  );

  storage.setToken(
    response.data.data.token
  );

  return response.data.data;
};



export const getProfile =
  async (): Promise<User> => {
    const response = await api.get(
      "/auth/me"
    );

    return response.data.data;
  };



export const updateProfile = async (
  data: UpdateProfileData
): Promise<User> => {
  const response = await api.patch(
    "/auth/profile",
    data
  );

  return response.data.data;
};



export const logout = () => {
  storage.removeToken();
};



export const isAuthenticated = () => {
  return storage.isAuthenticated();
};