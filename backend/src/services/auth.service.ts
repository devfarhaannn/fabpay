import prisma from "../config/prisma.js";

import {
  hashPassword,
  comparePassword,
} from "../utils/hash.js";

import { generateToken } from "../utils/jwt.js";

import type {
  UpdateProfileInput,
} from "../validators/profile.validator.js";

interface SignupInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface SigninInput {
  email: string;
  password: string;
}

export class AuthService {


  static async signup(data: SignupInput) {
    const username = data.username
      .trim()
      .toLowerCase();

    const email = data.email
      .trim()
      .toLowerCase();

    const existingUser =
      await prisma.user.findFirst({
        where: {
          OR: [
            {
              email,
            },
            {
              username,
            },
          ],
        },
      });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new Error(
          "Email already exists"
        );
      }

      throw new Error(
        "Username already taken"
      );
    }

    const hashedPassword =
      await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        username,
        email,
        password: hashedPassword,

        account: {
          create: {
            balance: "0",
          },
        },
      },

      include: {
        account: true,
      },
    });

    const token = generateToken(user.id);

    const {
      password,
      ...safeUser
    } = user;

    return {
      token,
      user: safeUser,
    };
  }

 

  static async signin(data: SigninInput) {
    const email = data.email
      .trim()
      .toLowerCase();

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },

        include: {
          account: true,
        },
      });

    if (!user) {
      throw new Error(
        "Invalid credentials"
      );
    }

    const isPasswordCorrect =
      await comparePassword(
        data.password,
        user.password
      );

    if (!isPasswordCorrect) {
      throw new Error(
        "Invalid credentials"
      );
    }

    const token = generateToken(user.id);

    const {
      password,
      ...safeUser
    } = user;

    return {
      token,
      user: safeUser,
    };
  }



  static async getProfile(
    userId: string
  ) {
    const user =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },

        include: {
          account: true,
        },
      });

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    const {
      password,
      ...safeUser
    } = user;

    return safeUser;
  }



  static async updateProfile(
    userId: string,
    data: UpdateProfileInput
  ) {
    const username = data.username
      .trim()
      .toLowerCase();


    const existingUsername =
      await prisma.user.findFirst({
        where: {
          username,

          id: {
            not: userId,
          },
        },

        select: {
          id: true,
        },
      });

    if (existingUsername) {
      throw new Error(
        "Username already taken"
      );
    }

  
    const user =
      await prisma.user.update({
        where: {
          id: userId,
        },

        data: {
          firstName:
            data.firstName.trim(),

          lastName:
            data.lastName.trim(),

          username,

          phone:
            data.phone?.trim() || null,
        },

        include: {
          account: true,
        },
      });


    const {
      password,
      ...safeUser
    } = user;

    return safeUser;
  }
}