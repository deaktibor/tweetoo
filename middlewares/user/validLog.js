/**
 * feldolgoza és validálja a login formból érkező adatokat
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo){
	const {validation, userModel} = objRepo;
	return (req, res, next) => {
		//default
		res.locals.rendAlert = {};
		res.locals.user= {};
		//Bad request
		if (req.body.email === 'undefined' || req.body.password === 'undefined'){
			return res.status(404).json({error: `Bad request`});
		}
		//Validate registration input data
		//TODO const {email, password} = req.body;
		const {email, password} = req.body;
		/*const email = req.body.email;
		const password = req.body.password;*/
		const result = validation.validateLogData({email, password});
		//Check result
		if (result.error){
			res.locals.rendAlert = {
				type: "alert-danger",
				message: `${result.error.message}`}
			return res.render("login", res.locals);
		} else {
			//Check user/not found
			let checkUser = userModel.findOne({email: result.value.email});
			if (checkUser === null){
				res.locals.rendAlert = {
					type: "alert-danger",
					message: `E-mail or password is incorrect`}
				return res.render("login", res.locals);
			}
			//Compare emal & password
			if (checkUser.email === result.value.email && checkUser.password === result.value.password){
				res.locals.user = checkUser;
				return next();
			}else{
				res.locals.rendAlert = {
					type: "alert-danger",
					message: `E-mail or password is incorrect`}
				//console.log(`${checkUser.email}=${result.value.email} && ${checkUser.password}= ${result.value.password}`)
				return res.render("login", res.locals);
			}
		}
	}
}
