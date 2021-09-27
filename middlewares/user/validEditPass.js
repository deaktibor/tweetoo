/**
 * feldolgoza és validálja a bejovo paramétereket
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo){
		const {validation, userModel} = objRepo;
		return (req, res, next) => {
			//Bad request
			if (req.body.oldPass === 'undefined' || req.body.newPass1 === 'undefined' || req.body.newPass2 === 'undefined'){
				return res.status(404).json({error: `Bad request`});
			}
			//Validation
			const {oldPass, newPass1, newPass2} = req.body;
			const result = validation.validateEditPass({oldPass, newPass1, newPass2});
			//Check result
			if (result.error) {
				res.locals.rendAlert = {
					type: "alert-danger",
					message: `${result.error.message}`
				}
				return res.render("editpass", res.locals);
			}
			//Check if edited user data is exist && is yours
			let checkUser = userModel.findOne({password: result.value.oldPass, id: res.locals.user.id});
			if (checkUser === null){
				res.locals.rendAlert = {
					type: "alert-danger",
					message: `Password for change not found`}
				return res.render("editpass", res.locals);
			}
			//Compare new password with olg password
			if (checkUser.password === result.value.newPass2){
				res.locals.rendAlert = {
					type: "alert-danger",
					message: `New password may not be the same`}
				return res.render("editpass", res.locals);
			}
			res.locals.newUserData = {...checkUser, password: result.value.newPass2}
			return next();
	}
}
