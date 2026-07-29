export interface User {
  id: string;

  firstName: string;
  lastName: string;

  username: string;
  email: string;

  phone: string | null;
  avatar: string | null;

  createdAt?: string;
  updatedAt?: string;
}