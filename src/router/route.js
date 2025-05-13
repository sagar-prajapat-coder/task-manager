import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";
import { registerValidator } from "../vailidator/auth.rule.js";


const router = Router();

router.get("/test", function (req, res) {
    res.send("Test route is working!");
  });

  router.post("/register",registerValidator, AuthController.register);
export default router;  