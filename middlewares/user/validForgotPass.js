/**
 *Input data validation
 * @param objRepo
 * @returns {(function(*, *, *): (*|undefined))|*}
 */
module.exports = function (objRepo){
	const {validation} = objRepo
	return (req, res, next) => {
		//Bad request
		if (req.body.sendEmail === 'undefined'){
			return res.status(404).json({error: `Bad request`});
		}
		//Validation
		let email ={};
		email = req.body.sendEmail;
		const result = validation.validateEmail({email});
		//Check
		if (result.error) {
			res.locals.rendAlert = {
				type: "alert-danger",
				message: `${result.error.message}`
			}
			return res.render("forgotpass", res.locals);
		} else {
			res.locals.sendEmail = result.value.email;
			return next();
		}
	}
}
