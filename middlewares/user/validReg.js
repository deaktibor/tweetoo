/**
 * feldolgoza és validálja a reg formból érkező adatokat
 * @param objRepo
 * @returns {function(*, *, *): *}
 */

module.exports = function (objRepo){
	const {validation, userModel} = objRepo;
	return (req, res, next) => {
		//default
		res.locals.rendAlert = {};
		res.locals.regData = {};
		//Bad request
		if (req.body.email === 'undefined' || req.body.password === 'undefined' || req.body.nickname === 'undefined'){
			return res.status(404).json({error: `Bad request`});
			}
		//Validate registration input data
		const email = req.body.email;
		const password = req.body.password;
		const nickname = req.body.nickname;
		const result = validation.validateRegData({email, password, nickname});
		//Check result
		if (result.error){
			res.locals.rendAlert = {
				type: "alert-danger",
				message: `${result.error.message}`}
			return res.render("registration", res.locals);
		}else {
			//Check duplicity email
			let checkDuplicity = userModel.findOne({email: result.value.email});
			if (checkDuplicity){
				res.locals.rendAlert = {
					type: "alert-danger",
					message: `Email: ${result.value.email} already exists`}
				return res.render("registration", res.locals);
			}
			//Check duplicity nickname
			checkDuplicity = userModel.findOne({password: result.value.nickname});
			if (checkDuplicity){
				res.locals.rendAlert = {
					type: "alert-danger",
					message: `Nickname: ${result.value.nickname} already exists`}
				return res.render("registration", res.locals);
			}
			res.locals.regData = result.value;
			return next();
		}
	}
}

