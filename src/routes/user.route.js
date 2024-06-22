import { Router } from "express";
import { getAllUsers, loginUser, registerUser,refreshAccessToken, logoutUser } from "../controllers/user.controller.js";


const router  = Router();

router.route("/getUserList").get(getAllUsers);
router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").put(logoutUser);
router.route("/refreshAccessToken").post(refreshAccessToken);

export default router;