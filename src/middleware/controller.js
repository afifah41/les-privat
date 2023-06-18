import { connection } from "./connection.js";
import { body, validationResult } from "express-validator";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import {
	User,
	Student,
	Teacher,
	Subject,
	Schedule,
	Class,
	Registration,
	TCS,
} from "../database/models.js";

export const login_register = (req, res) => {
	res.render("home", {
		title: "Les Privat",
		layout: "layouts/main",
		user: req.session.user,
	});
};

export const home = (req, res) => {
	res.render("home", {
		title: "Les Privat",
		layout: "layouts/main",
		user: req.session.user,
	});
};

export const profile = (req, res) => {
	res.render("profile", {
		title: "Profile",
		layout: "layouts/main",
		user: req.session.user,
	});
};

export const schedule = (req, res) => {
	res.render("schedule", {
		title: "Schedule",
		layout: "layouts/main",
		user: req.session.user,
	});
};

export const findclass = (req, res) => {
	res.render("findclass", {
		title: "Find Class",
		layout: "layouts/main",
		user: req.session.user,
	});
};

export const myclass = (req, res) => {
	res.render("myclass", {
		title: "My Class",
		layout: "layouts/main",
		user: req.session.user,
	});
};

// Validation rules for login
export const loginValidationRules = () => {
	return [
		body("email").isEmail().withMessage("Invalid email"),
		body("password")
			.isLength({ min: 8 })
			.withMessage("Password must be at least 8 characters"),
	];
};

export const login = async (req, res) => {
	try {
		let { email, password } = req.body;

		let hashed_pass = crypto
			.createHash("sha256")
			.update(password)
			.digest("base64");

		const user = await User.findOne({
			where: { email, password: hashed_pass },
		});

		if (!user) {
			res.status(401).send("Email or password invalid!");
			return;
		}

		req.session.user = user;

		res.render("home", {
			title: "Les Privat",
			layout: "layouts/main",
			user: req.session.user,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Login gagal.");
	}
};

export const register = async (req, res) => {
	try {
		let { name, email, password, role } = req.body;

		// Validate inputs using express-validator
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Hash the password securely
		let hashedPassword = crypto
			.createHash("sha256")
			.update(password)
			.digest("base64");

		// Check if email is already registered
		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(500).send("Email is already registered");
		}

		// Insert the new user
		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
			role,
		});

		// newUser = await User.findOne({
		// 	where: { email, password: hashedPassword },
		// });

		// Insert the new user with role
		if (role == "siswa") {
			await Student.create({
				id_student: newUser.id_user,
			});
		} else {
			await Teacher.create({
				id_teacher: newUser.id_user,
			});
		}

		// Store the user data in the session
		req.session.user = newUser;

		// Redirect to the home page
		res.render("home", {
			title: "Les Privat",
			layout: "layouts/main",
			user: req.session.user,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Failed to register user");
	}
};

export const upload_picture = async (req, res) => {
	try {
		const userId = req.session.user.id;
		const newPicture = req.body.picture;
		const fileExtension = req.body.extension;

		const folderPath =
			req.session.user.role === "siswa"
				? "public/images/siswa"
				: "public/images/guru";

		const user = await User.findOne({ where: { id: userId } });
		if (user.profile_picture) {
			const oldFilePath = path.join(folderPath, User.profile_picture);
			fs.unlinkSync(oldFilePath);
		}

		const newFileName = `${req.session.user.name}_${userId}.${fileExtension}`;
		const filePath = path.join(folderPath, newFileName);

		// Remove the "data:image/extension;base64," prefix from the picture data
		const base64Data = newPicture.replace(/^data:image\/\w+;base64,/, "");
		const fileBuffer = Buffer.from(base64Data, "base64");

		fs.writeFileSync(filePath, fileBuffer);

		await User.update(
			{ profile_picture: newFileName },
			{ where: { id_user: userId } }
		);

		// Fetch the updated user data from the database
		const updatedUser = await User.findOne({ where: { id_user: userId } });

		// Update req.session.user with the updated user data
		req.session.user = updatedUser;

		res.redirect("/profile");
	} catch (error) {
		console.error(error);
		res.status(500).send("Terjadi kesalahan saat mengunggah foto profil.");
	}
};

export const update_personal_data = async (req, res) => {
	try {
		const id = req.session.user.id;
		const {
			name,
			email,
			phone_number,
			gender,
			day,
			month,
			year,
			address,
			mapel,
		} = req.body;

		// Update the user profile with the submitted form data
		await User.update(
			{
				name,
				email,
				phone_number,
				gender,
				address,
				birth_date: new Date(year, month, day),
			},
			{ where: { id_user: id } }
		);

		// Fetch the updated user data from the database
		const updatedUser = await User.findOne({ where: { id_user: id } });

		// Update req.session.user with the updated user data
		req.session.user = updatedUser;

		res.redirect("/profile");
	} catch (error) {
		// res.redirect("/profile");
		console.error(error);
		res.status(500).send("Terjadi kesalahan saat mengupdate profil.");
	}
};

export const change_password = async (req, res) => {
	try {
		const id_user = req.session.user.id;
		const old_password = req.body.old_password;
		const new_password = req.body.new_password;
		const conf_new_password = req.body.confirm_new_password;

		let hashed_password = crypto
			.createHash("sha256")
			.update(old_password)
			.digest("base64");

		const user = await User.findOne({
			where: { id_user, password: hashed_password },
		});

		if (!user) {
			res.status(401).send("Password salah!");
			return;
		}

		if (new_password == conf_new_password) {
			hashed_password = crypto
				.createHash("sha256")
				.update(password)
				.digest("base64");

			await User.update({ password: hashed_password }, { where: { id_user } });
		}
	} catch (error) {}
};

export const teacher_subject_class = async (req, res) => {
	try {
		const id_teacher = req.session.user.id;
		const password = req.body.password;
		const new_password = req.body.password;
		const conf_new_password = req.body.password;

		let hashed_password = crypto
			.createHash("sha256")
			.update(password)
			.digest("base64");

		const user = await User.findOne({
			where: { id_user, password: hashed_password },
		});

		if (!user) {
			res.status(401).send("Password salah!");
			return;
		}

		if (new_password == conf_new_password) {
			hashed_password = crypto
				.createHash("sha256")
				.update(password)
				.digest("base64");

			await User.update({ password: hashed_password }, { where: { id_user } });
		}
	} catch (error) {}
};

export const logout = (req, res) => {
	// Hapus session User
	req.session.destroy();

	res.redirect("/");
};

export const illegal = (req, res) => {
	res.status(404);
	res.send("<h1>404<h1>");
};
