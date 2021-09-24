/**
 * Login es session kezeles
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo){
	return (req, res, next) => {
		//Delete unnecessary keys in user object for session store
		delete res.locals.user.password;
		delete res.locals.user.secret;

		//Save session
		req.session.user = res.locals.user;

		req.session.save ((err) =>{
			if (err){
				return next(err);
			}else {
				return next();
			}
		})
	}
}
