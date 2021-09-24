module.exports = function (objRepo){
	const {tweetModel} = objRepo;
	return (req, res, next) => {
		//Insert
		tweetModel.insert(res.locals.newTweetModel);
		return next();
	}
}
