import express  from "express";
import { ChangePassword, Register, login } from "../controller/auth.js";

const router = express.Router()

router.route("/register").post(Register);
router.route("/login").post(login);
router.route("/changePassword").put(ChangePassword);

export default router
