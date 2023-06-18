import express from "express";
import session from "express-session";
import path from "path";
import routes from "./routes.js";
import expressLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";

const app = express();

// Set the view engine to ejs
app.set("view engine", "ejs");

// Serve static files from the 'public' and 'utils' directory
const staticPathPublic = path.resolve("public");
const staticPathUtils = path.resolve("src/utils");

app.use(express.static(staticPathPublic));
app.use(express.static(staticPathUtils));
app.use(expressLayouts);

// Parse URL-encoded bodies
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Set up session middleware
app.use(
	session({
		secret: "your-secret-key",
		resave: false,
		saveUninitialized: false,
	})
);

app.use("/", routes);

// Start the server
const port = 8080;
app.listen(port, () => {
	console.log(`>> Server is running on http://localhost:${port}`);
});
