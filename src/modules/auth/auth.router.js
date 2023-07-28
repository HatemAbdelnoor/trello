import * as authController from './controller/auth.js'
import { Router } from "express";
const router = Router();

router.post("/signup", authController.signup)
router.get("/confirmEmail/:token", authController.confirmEmail)
router.get("/unsubscribe/:token", authController.unsubscribe)
router.post("/login", authController.login)
router.delete("/deleteUser",authController.deleteUser)
router.patch("/logout",authController.logout)
router.patch("/softDeleteUser",authController.softDeleteUser)
router.patch("/updatePassword", authController.updatePassword)

export default router