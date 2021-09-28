/**
 * feldolgoza a bekuldott search paramétert és elvégzi a full text keresést a tweet-ek és nickname kozot
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo) {
	return (req, res, next) => {

		console.log('query'+req.query.search)

		//Simple validate input length3
		if (req.query.search.length > 2){
			return next();
		}
		res.locals.rendAlert = {
			type: "alert-danger",
			message: `Bad or missing search parameter`}
		return res.render("search", res.locals);
	}
}
