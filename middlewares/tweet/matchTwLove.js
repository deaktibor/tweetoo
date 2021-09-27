module.exports = function (objRepo) {
	const {tweetModel} = objRepo;
	return (req, res, next) => {
		//check request
		if (typeof req.params === 'undefined'){
			return res.status(404).json({error: `Bad request`});
		}

		res.locals.matchTweet= tweetModel.findOne({id: req.params.id});
		//check
		if (!res.locals.matchTweet) {
			return next(new Error('Tweet does not exist'));
		} else {
			return next();
		}
	}
}
