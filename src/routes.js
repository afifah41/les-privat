import express from "express";
import { body } from "express-validator";
import permit from "./middleware/authorization.js";
import {
	login_register,
	validationRules,
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
	change_password,
	createSchedule,
	illegal,
} from "./middleware/controller.js";

const router = express.Router();

// Define your routes
router.get("/", login_register);
router.post("/register", validationRules(), register);
router.post("/login", validationRules(), login);
router.get("/home", permit("siswa", "guru"), home);
router.get("/profile", permit("siswa", "guru"), profile);
router.get("/schedule", permit("siswa", "guru"), schedule);
router.get("/findclass", permit("siswa", "guru"), findclass);
router.get("/myclass", permit("siswa", "guru"), myclass);
router.get("/profile/logout", permit("siswa", "guru"), logout);
router.post("/profile", update_personal_data);
router.put("/update-foto", upload_picture);
router.post("/ubah-password", change_password);
router.post("/bikinjadwal", permit("guru"), createSchedule);

// Handle non-existent pages
router.get("*", (req, res, next) => {
	if (req.originalUrl === "/login-register") {
		next();
	} else {
		illegal(req, res);
	}
});

export default router;
