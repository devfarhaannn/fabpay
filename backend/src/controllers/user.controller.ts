import { Request, Response } from "express";

import { UserService } from "../services/user.service.js";
import { changePasswordSchema } from "../validators/user.validator.js";

export class UserController {
  static async search(
    req: Request,
    res: Response
  ) {
    try {
      const userId = req.userId!;

      const query =
        (req.query.query as string) ?? "";

      const users =
        await UserService.searchUsers(
          userId,
          query
        );

      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      });
    }
  }

  static async changePassword(
    req: Request,
    res: Response
  ) {
    try {
      const userId = req.userId!;

      
      const {
        currentPassword,
        newPassword,
      } = changePasswordSchema.parse(req.body);

      await UserService.changePassword(
        userId,
        currentPassword,
        newPassword
      );

      return res.status(200).json({
        success: true,
        message: "Password updated successfully.",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      });
    }
  }
}