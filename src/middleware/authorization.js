const permit = (...roles) => {
	return (req, res, next) => {
		let user = req.session.user;
		if (user && roles.some((role) => role.includes(user.role))) {
			next();
		} else {
			res.redirect("/");
		}
	};
};

export default permit;
