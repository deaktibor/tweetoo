/**
 * sikeres validáció után elmenti az új profil email-t
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo){
	const {db, userModel} = objRepo;
	return (req, res, next) => {
		//Update user data
		userModel.update(res.locals.newUserData);
		db.saveDatabase(next);
	}
}
