import { Router } from "express";
import { getAllUsers, registerUser } from "../controllers/user.controller.js";


const router  = Router();

router.route("/getUserList").get(getAllUsers);
router.route("/registerUser").post(registerUser);

export default router;