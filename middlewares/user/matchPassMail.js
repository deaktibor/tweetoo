/**
 * feldolgoza a formbol jovo adatot és kikeresi az adot profilt ha letezik
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo){
	const {userModel} = objRepo
	return (req, res, next) => {
		//Set to default
		if (typeof req.session.trySendEmail === 'undefined'){
			req.session.trySendEmail = 1;
		}

		/**
		 * Check email for send password
		 * @returns {*}
		 */
		function fnCheck (){
			const checkUser = userModel.findOne({email: res.locals.sendEmail});
			if (checkUser === null) {
				res.locals.rendAlert = {
					type: "alert-danger",
					message: `Email not found (${req.session.trySendEmail} of 3)`
				}
				req.session.trySendEmail++
				req.session.save((err) => {
					if (err) {
						next(new Error(err.stack));
					}
				})
			}else {
				res.locals.rendAlert = {
					type: "alert-success",
					message: `Password sent to ${checkUser.email}`
				}
				req.session.destroy(function(err) {
					if (err){
						next(new Error(err.stack));
					}
				})
				//send mail with pass
				//next for email service
				//return next();
				console.log(`Sent to Emal: ${checkUser.email} Password: ${checkUser.password}`);
			}
		}
		//Prevention of DDoS attacks
		switch (req.session.trySendEmail){

			case 1:
				fnCheck()
				return res.render("forgotpass", res.locals);
			case 2:
				fnCheck();
				return res.render("forgotpass", res.locals);
			case 3:
				fnCheck();
				return res.render("forgotpass", res.locals);
			case 4:
				res.locals.rendAlert = {
					type: "alert-danger",
					message: `Limit exceeded... another attempt after 5 min`
				}
				req.session.trySendEmailDate = Date.now();
				req.session.trySendEmail++
				return res.render("forgotpass", res.locals);
			case 5:
				if (typeof  req.session.trySendEmailDate !== 'undefined' && req.session.trySendEmailDate !== null){
					const diff = Date.now() - req.session.trySendEmailDate;
					const diffMin = Math.floor(diff/1000/60);
					if (diffMin > 5){
						req.session.destroy((err) => {
							if (err){
								next(new Error(err.stack));
							}
						})
						return res.render("forgotpass", res.locals);
					}
					res.locals.rendAlert = {
						type: "alert-danger",
						message: `Limit exceeded... another attempt after ${5-diffMin} min`
					}
					return res.render("forgotpass", res.locals);
				}
		}
	}
}
