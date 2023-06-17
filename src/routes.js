import express from "express";
import { body } from "express-validator";
import permit from "./middleware/authorization.js";
import {
	login_register,
	login,
	register,
	logout,
	home,
	profile,
	schedule,
	findclass,
	myclass,
	illegal,
} from "./middleware/controller.js";

const router = express.Router();

// Define your routes
router.get("/", login_register);
router.get("/home", permit("siswa", "guru"), home);
router.get("/profile", permit("siswa", "guru"), profile);
router.get("/schedule", permit("siswa", "guru"), schedule);
router.get("/findclass", permit("siswa", "guru"), findclass);
router.get("/myclass", permit("siswa", "guru"), myclass);
router.get("/profile/logout", permit("siswa", "guru"), logout);

router.post(
	"/register",
	[
		body("email").isEmail().withMessage("Invalid email"),
		body("password")
			.isLength({ min: 8 })
			.withMessage("Password must be at least 8 characters"),
	],
	register
);
router.post(
	"/login",
	[
		body("email").isEmail().withMessage("Invalid email"),
		body("password")
			.isLength({ min: 8 })
			.withMessage("Password must be at least 8 characters"),
	],
	login
);

// Handle non-existent pages
router.get("*", (req, res, next) => {
	if (req.originalUrl === "/login-register") {
		next();
	} else {
		illegal(req, res);
	}
});

export default router;
