import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

export class UserService {
  static async searchUsers(
    currentUserId: string,
    query: string
  ) {
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: currentUserId,
        },
        OR: [
          {
            firstName: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            username: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },

      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        avatar: true,
      },

      take: 10,
    });

    return users;
  }

  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {
    if (!currentPassword || !newPassword) {
      throw new Error("All fields are required.");
    }

    if (currentPassword === newPassword) {
      throw new Error(
        "New password must be different from current password."
      );
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      throw new Error(
        "Password must be at least 8 characters long and include uppercase, lowercase and a number."
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Current password is incorrect.");
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return true;
  }
}