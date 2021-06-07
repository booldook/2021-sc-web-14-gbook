module.exports = () => {
	return (req, res, next) => {
		res.locals.user = req.session.user || null; // { id, userid, email, username }
		next();
	}
}


