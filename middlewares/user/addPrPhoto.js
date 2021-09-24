/**
 * kezeli a profil fotó feltöltését (a profil fotó egy statikus könyvtárban lesz tárolva a disken
 * és a file neve valamilyen szinten meg fog egyezni a user id-vel)
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo){
	return (req, res, next) => {
		return next();
	}
}
