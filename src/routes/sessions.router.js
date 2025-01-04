import { request, response, Router } from "express";
import passport from "passport";
import UserController from "../controllers/user.controller.js";

const router = Router();
const userController = new UserController();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/current", passport.authenticate("current", {session: false}), userController.current);

export default router;