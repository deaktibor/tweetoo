/**
 * kijelentkezés
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo){
	return (req, res, next) => {
		req.session.destroy((err) =>{
			if (err){
				console.error(err);
				return res.render("error", res.locals);
			}else {
				return next();
			}
		})
	}
}
