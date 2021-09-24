/**
 * session alapján ellenőrzi a felhasználót, ha nincs bejelentkezve akkor átirányít a főoldalra (homescreen)
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo){
	return (req, res, next) => {
		if (typeof req.session.user === 'undefined'){
			res.locals.visitor = {id: 'visitor'};
			return next();
		}else {
			res.locals.user = req.session.user;
			//set to default
			res.locals.matchTweet = {};
			res.locals.delTweet = {};
			return next();
		}
	}
}
