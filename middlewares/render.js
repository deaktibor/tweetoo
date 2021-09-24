/**
 * Render middleware
 * @param objRepo
 * @param view
 * @returns {function(*, *, *): *}
 */

module.exports = function (objRepo, view){
	return (req, res, next) => {
		//Render content
		return res.render(view, res.locals);
	}
}
