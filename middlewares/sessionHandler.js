/**
 * Session handler
 * reload/refresh session data
 * @param objRepo
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo){
	const {userModel} = objRepo;
	return (req, res, next) => {
		//Load user data
		const user = userModel.findOne({id: res.locals.user.id});
		let sessionUserData = {...user};
		//Delete unnecessary property
		delete sessionUserData.password;
		delete sessionUserData.secret;
		delete sessionUserData.meta;
		delete sessionUserData['$loki'];
		//User session data
		req.session.user = sessionUserData;

		req.session.save ((err) =>{
			if (err){
				return next(err);
			}else {
				return next();
			}
		})

	}
}

