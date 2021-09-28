/**
 * Pagination
 * @param objRepo
 * @returns {function(*=, *, *): *}
 */
module.exports = function (objRepo){
	const {paginate, tweetModel} = objRepo;
	return (req, res, next) => {

		const isSearch = req.query.search;

		let tweetCount = tweetModel.count();

		//Overide when search
		if (isSearch){
			tweetCount = tweetModel.find({isPublic: true, text: {'$contains' : isSearch }}).length;
		}
		const pageCount = Math.ceil(tweetCount / req.query.limit);
		res.locals.pageCount = pageCount;
		res.locals.pages = paginate.getArrayPages(req)(3, pageCount, req.query.page);
		return next();
	}
}
