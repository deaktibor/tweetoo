module.exports = function (objRepo){
	const {tweetModel} = objRepo;
	return (req, res, next) => {
		res.locals.tweets = tweetModel.find({user_id: res.locals.user.id});
		return next();
	}
}
