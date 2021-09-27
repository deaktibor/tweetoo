module.exports = function (objRepo){
	const {tweetModel, userModel} = objRepo;
	return (req, res, next) => {
		let contentTweets;
		//User
		if (res.locals.user){
			contentTweets = tweetModel
				.chain()
				.find({isPublic: true})
				.simplesort('publicTimestamp', {desc: true})
				.limit(10)
				.data();
		}else {
			//Visitor
			contentTweets = tweetModel
				.chain()
				.find({isPublic: true})
				.simplesort('publicTimestamp', {desc: true})
				.limit(10)
				.data();
		}

		res.locals.contentTweets = contentTweets.map((tweet) => {
			const container = {...tweet};
			container.user = userModel.findOne({tweet: { '$contains' : tweet.id }});
			return container;
		})

		if (!res.locals.contentTweets){
			return next(new Error('Public tweets find error'));
		}
		return next();
	}
}
