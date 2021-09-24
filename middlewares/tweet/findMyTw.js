module.exports = function (objRepo){
	const {tweetModel} = objRepo;
	return (req, res, next) => {

		//User
		if (res.locals.user){
			res.locals.contentTweets = tweetModel
				.chain()
				.find({isPublic: true})
				.simplesort('publicTimestamp', {desc: true})
				.limit(10)
				.data();
		}else {
			//Visitor
			res.locals.contentTweets = tweetModel
				.chain()
				.find({isPublic: true})
				.simplesort('publicTimestamp', {desc: true})
				.limit(10)
				.data();
		}


		if (!res.locals.contentTweets){
			return next(new Error('Public tweets find error'));
		}else {
			return next();
		}
	}
}


