import express from "express";
import { body } from "express-validator";
import permit from "./middleware/authorization.js";
import {
	login_register,
	loginValidationRules,
	login,
	register,
	logout,
	home,
	profile,
	schedule,
	findclass,
	myclass,
	upload_picture,
	update_personal_data,
	illegal,
} from "./middleware/controller.js";

const router = express.Router();

// Define your routes
router.get("/", login_register);
router.post("/register", loginValidationRules(), register);
router.post("/login", loginValidationRules(), login);
router.get("/home", permit("siswa", "guru"), home);
router.get("/profile", permit("siswa", "guru"), profile);
router.get("/schedule", permit("siswa", "guru"), schedule);
router.get("/findclass", permit("siswa", "guru"), findclass);
router.get("/myclass", permit("siswa", "guru"), myclass);
router.get("/profile/logout", permit("siswa", "guru"), logout);
router.post("/update-profile", update_personal_data);
router.put("/update-foto", upload_picture);

// Handle non-existent pages
router.get("*", (req, res, next) => {
	if (req.originalUrl === "/login-register") {
		next();
	} else {
		illegal(req, res);
	}
});

export default router;
