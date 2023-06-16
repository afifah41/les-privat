export const authorization = (...permitRules) => {
	return (req, res, next) => {
		let user = req.session.user;

		if (user && permitRules.includes(user.role)) {
			next();
		} else {
			console.log("Unauthorized access detected:");
			console.log("User:", user);
			console.log("Permit Rules:", permitRules);
			// res.status(401).send("Unauthorized access");

			res.render("home", {
				title: "Les Privat",
				layout: "layouts/main",
			});
		}
	};
};
