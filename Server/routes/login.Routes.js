import { Router } from "express"

import {accessLogin, logoutLogin, changePassword, forgotLogin, getSession} from "../controllers/login.Controller.js";

const router = Router();

router.get("/session",getSession);
router.post("/access",accessLogin)
router.post("/logout",logoutLogin)
router.post("/olvidaste",forgotLogin)
router.post("/recuperar/:Username",changePassword)

export default router;