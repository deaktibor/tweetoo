/**
 * sikeres validáció után elmenti az új profil email-t
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo){
	return (req, res, next) => {
		return next();
	}
}
