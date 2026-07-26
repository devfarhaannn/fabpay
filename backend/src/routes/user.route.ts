import { Router } from "express";

import { UserController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/search",
  authMiddleware,
  UserController.search
);

router.patch(
  "/change-password",
  authMiddleware,
  UserController.changePassword
);

export default router;