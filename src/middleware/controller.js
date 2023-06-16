import { connection } from "../utils/connection.js";
import { validationResult } from "express-validator";
import ip from "ip";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const { sign, verify } = jwt;


export const login = (req, res) => {
	let { email, password } = req.body;
	let hashed_pass = crypto
		.createHash("sha256")
		.update(password)
		.digest("base64");

	let loginQuery = `SELECT * FROM pengguna WHERE email = ? AND password = ?`;
	connection.query(loginQuery, [email, hashed_pass], (err, rows) => {
		if (err) {
			console.error(err);
			res.status(500).send("Login gagal.");
		} else {
			if (rows.length == 1) {
				// mengambil data user hasil query
				let user = rows[0];
				// membuat token dengan durasi 24jam
				let token = sign({ user }, "rasianegara", {
					expiresIn: "24h",
				});

				let tokenData = {
					id_user: user.id,
					access_token: token,
					ip_address: ip.address(),
				};

				let insertTokenQuery = "INSERT INTO token SET ?";
				connection.query(insertTokenQuery, tokenData, function (error, rows) {
					if (error) {
						console.log(error);
						res.status(500).send("Gagal generate token");
					} else {
						req.session.user = user;
						res.render("home", {
							title: "Les Privat",
							layout: "layouts/main",
							user: req.session.user,
						});
					}
				});
			} else {
				res.status(401).send("Email or password invalid!");
			}
		}
	});
};

export const register = (req, res) => {
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

	// Query to check if email is already registered
	let checkEmailQuery = "SELECT * FROM pengguna WHERE email = ?";
	let queryValues = [email];

	// Check if email is already registered
	connection.query(checkEmailQuery, queryValues, (error, rows) => {
		if (error) {
			console.error(error);
			return res.status(500).send("Internal Server Error");
		} else {
			if (rows.length === 0) {
				// If email is not registered, insert the new user
				let insertQuery =
					"INSERT INTO Pengguna (name, email, password, role) VALUES (?, ?, ?, ?)";
				let insertValues = [name, email, hashedPassword, role];
				console.log(insertValues);

				connection.query(insertQuery, insertValues, (error, rows) => {
					if (error) {
						console.error(error);
						res.status(500).send("Failed to insert data into pengguna table");
					} else {
						// Store name and email in session
						req.session.user = req.body;

						// Redirect based on role selection
						res.render("home", {
							title: "Les Privat",
							layout: "layouts/main",
							user: req.session.user,
						});
					}
				});
			} else {
				// If email is already registered
				res.status(500).send("Email is already registered");
			}
		}
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

export const illegal = (req, res) => {
	res.status(404);
	res.send("<h1>404<h1>");
};
