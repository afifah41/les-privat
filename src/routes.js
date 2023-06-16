import express from "express";
import {
	home,
	login,
	register,
	profile,
	schedule,
	findclass,
	myclass,
	illegal,
} from "./middleware/controller.js";
import { body } from "express-validator";

const router = express.Router();

// Define your routes
router.get("/", home);
router.get("/home", home);
router.get("/profile", profile);
router.get("/schedule", schedule);
router.get("/findclass", findclass);
router.get("/myclass", myclass);
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

// untuk menangani halaman tidak ada
router.get("*", illegal);

export default router;
