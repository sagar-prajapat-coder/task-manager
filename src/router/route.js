import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";
import { loginValidator, registerValidator } from "../vailidator/auth.rule.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = Router();


  router.post("/register",registerValidator, AuthController.register);
  router.post("/login", loginValidator, AuthController.login);


  router.use(authMiddleware); 
  
export default router;  