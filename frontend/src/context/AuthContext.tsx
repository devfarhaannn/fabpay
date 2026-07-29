import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getProfile,
  isAuthenticated,
} from "../services/auth.service";

import type { User } from "../types/user";


interface AuthUser extends User {
  account?: {
    balance: number;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  const refreshUser = async () => {
    try {
      setLoading(true);

      if (!isAuthenticated()) {
        setUser(null);
        return;
      }

      const profile = await getProfile();

      setUser(profile);
    } catch (error) {
      console.error(
        "Failed to refresh user:",
        error
      );

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};