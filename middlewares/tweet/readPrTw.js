const {compileTrust} = require("express/lib/utils");
module.exports = function (objRepo){
	const {tweetModel} = objRepo;
	return (req, res, next) => {
		res.locals.tweets = tweetModel.find({user_id: res.locals.user.id});
		res.locals.tweets.draft = tweetModel.find({user_id: res.locals.user.id, isPublic: false});
		res.locals.tweets.public = tweetModel.find({user_id: res.locals.user.id, isPublic: true})
		return next();
	}
}
