/**
 * feldolgoza és validálja a bejovo parametereket
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo){
	const {validation, userModel} = objRepo;
	return (req, res, next) => {
		//Bad request
		if (req.body.oldEmail === 'undefined' || req.body.newEmail === 'undefined'){
			return res.status(404).json({error: `Bad request`});
		}
		//Validation
		const {oldEmail, newEmail} = req.body;
		const result = validation.validateEditEmail({oldEmail, newEmail});
		//Check result
		if (result.error) {
			res.locals.rendAlert = {
				type: "alert-danger",
				message: `${result.error.message}`
			}
			return res.render("editmail", res.locals);
		}
		//Check if edited user data is exist && is yours
		const userExist = userModel.findOne({email: result.value.oldEmail, id: res.locals.user.id});
		if (userExist === null){
			res.locals.rendAlert = {
				type: "alert-danger",
				message: `E-mail for change not found`}
			return res.render("editmail", res.locals);
		}
		//Compare new email with olg email
		if (userExist.email === result.value.newEmail){
			res.locals.rendAlert = {
				type: "alert-danger",
				message: `New email may not be the same`}
			return res.render("editmail", res.locals);
		}
		//Check if new email is exist
		const emailExist = userModel.findOne({email: result.value.newEmail});
		if (emailExist){
			res.locals.rendAlert = {
				type: "alert-danger",
				message: `E-mail is exist`}
			return res.render("editmail", res.locals);
		}
		res.locals.newUserData = {...userExist, email: result.value.newEmail}
		return next();
	}
}

