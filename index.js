import express from "express";
import path from "path";
import mysql from "mysql";
import session from "express-session";
import crypto from "crypto";

const app = express();
const port = 8080;
app.set("view engine", "ejs");

const staticPath = path.resolve("public");
app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "your-secret-key",
		resave: false,
		saveUninitialized: false,
	})
);

const conn = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "dbcontoh",
});

app.get("/", (req, res) => {
	res.render("index");
});

app.post("/register", (req, res) => {
	const { name, email, password, role } = req.body;
	const hashed_pass = crypto
		.createHash("sha256")
		.update(password)
		.digest("base64");
	let tableName;
	if (role === "guru") {
		tableName = "Guru";
	} else if (role === "siswa") {
		tableName = "Siswa";
	} else {
		res.status(400).send("Invalid role selection.");
		return;
	}

	const query = `INSERT INTO ${tableName} (Nama, Email, Pass) VALUES (?, ?, ?)`;
	conn.query(query, [name, email, hashed_pass], (err, result) => {
		if (err) {
			console.error(err);
			res.status(500).send("Error occurred while registering user.");
		} else {
			console.log("User registered successfully.");

			// Store name and email in session
			req.session.name = name;
			req.session.email = email;

			// Redirect based on role selection
			if (role === "guru") {
				res.redirect("/homeguru");
			} else if (role === "siswa") {
				res.redirect("/homesiswa");
			}
		}
	});
});

app.post("/login", (req, res) => {
	const { email, password } = req.body;

	// Hash the provided password
	const hashed_pass = crypto
		.createHash("sha256")
		.update(password)
		.digest("base64");

	// Check the credentials in the database
	const query = `SELECT * FROM ${tableName} WHERE Email = ? AND Pass = ?`;
	conn.query(query, [email, hashed_pass], (err, result) => {
		if (err) {
			console.error(err);
			res.status(500).send("Error occurred while logging in.");
			return;
		}

		if (result.length === 1) {
			// Credentials are correct
			const role = result[0].role;
			req.session.name = result[0].Nama;
			req.session.email = result[0].Email;

			if (role === "guru") {
				res.redirect("/homeguru");
			} else if (role === "siswa") {
				res.redirect("/homesiswa");
			} else {
				res.status(400).send("Invalid role selection.");
			}
		} else {
			// Credentials are incorrect
			res.status(401).send("Invalid email or password.");
		}
	});
});

app.get("/homesiswa", (req, res) => {
	res.render("homesiswa");
});

app.get("/profilesiswa", (req, res) => {
	const { name, email } = req.session;
	if (!name || !email) {
		res.status(400).send("Name or email is missing.");
		return;
	}
	res.render("profilesiswa", { name, email });
});

app.get("/schedulesiswa", (req, res) => {
	res.render("schedulesiswa");
});

app.get("/findclass", (req, res) => {
	res.render("findclass");
});

app.get("/homeguru", (req, res) => {
	res.render("homeguru");
});

app.get("/profileguru", (req, res) => {
	const { name, email } = req.session;
	if (!name || !email) {
		res.status(400).send("Name or email is missing.");
		return;
	}
	res.render("profilesiswa", { name, email });
});

app.get("/scheduleguru", (req, res) => {
	res.render("scheduleguru");
});

app.listen(port, () => {
	console.log("Server is ready");
});
