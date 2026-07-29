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

  static async getSuggestedUsers(
    currentUserId: string
  ) {
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: currentUserId,
        },

        username: {
          startsWith: "demo_",
          mode: "insensitive",
        },
      },

      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        avatar: true,
      },

      orderBy: {
        firstName: "asc",
      },

      take: 4,
    });

    return users;
  }

  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {
    if (!currentPassword || !newPassword) {
      throw new Error(
        "Current password and new password are required."
      );
    }

    if (currentPassword === newPassword) {
      throw new Error(
        "New password must be different from current password."
      );
    }

    if (newPassword.length < 8) {
      throw new Error(
        "Password must be at least 8 characters."
      );
    }

    if (newPassword.length > 50) {
      throw new Error(
        "Password cannot exceed 50 characters."
      );
    }

    if (!/[A-Z]/.test(newPassword)) {
      throw new Error(
        "Password must contain at least one uppercase letter."
      );
    }

    if (!/[a-z]/.test(newPassword)) {
      throw new Error(
        "Password must contain at least one lowercase letter."
      );
    }

    if (!/[0-9]/.test(newPassword)) {
      throw new Error(
        "Password must contain at least one number."
      );
    }

    if (!/[^A-Za-z0-9]/.test(newPassword)) {
      throw new Error(
        "Password must contain at least one special character."
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

    const isPasswordCorrect =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isPasswordCorrect) {
      throw new Error(
        "Current password is incorrect."
      );
    }

    const isSameAsOldPassword =
      await bcrypt.compare(
        newPassword,
        user.password
      );

    if (isSameAsOldPassword) {
      throw new Error(
        "New password must be different from current password."
      );
    }

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

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