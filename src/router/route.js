import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";
import { loginValidator, registerValidator } from "../vailidator/auth.rule.js";
import authMiddleware from "../middleware/authmiddleware.js";
import { UserController } from "../controller/user.controller.js";
import { taskValidator } from "../vailidator/task.rule.js";
import { TaskController } from "../controller/task.controller.js";

const router = Router();


  router.post("/register",registerValidator, AuthController.register);
  router.post("/login", loginValidator, AuthController.login);


  router.use(authMiddleware); 

  // user routes
  router.get("/users",UserController.getUser);

  // ticket routes
  router.post("/ticket/save", taskValidator, TaskController.store);
export default router;  