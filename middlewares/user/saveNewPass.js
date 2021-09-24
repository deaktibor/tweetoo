/**
 * sikeres validáció után elmenti az új jelszót
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo){
	return (req, res, next) => {
		return next();
	}
}
