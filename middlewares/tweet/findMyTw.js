module.exports = function (objRepo){
	const {tweetModel, userModel} = objRepo;
	return (req, res, next) => {

		//User
		if (typeof res.locals.user !== 'undefined'){
			const contentTweets = tweetModel
				.chain()
				.find({isPublic: true})
				.simplesort('publicTimestamp', {desc: true})
				.limit(10)
				.data();


			res.locals.contentTweets = contentTweets.map((tweet) => {
				const container = {...tweet};
				container.loveCount = tweet.love_id.length;
				container.isLoved = Boolean(tweet.love_id.find(e => e === res.locals.user.id));
				container.user = userModel.findOne({tweet: { '$contains' : tweet.id }});
				return container;
			})
		console.log(res.locals.contentTweets)
		}
		if (Object.keys(res.locals.contentTweets).length === 0){
			res.locals.rendAlert = {
				type: "alert-danger",
				message: "Public tweets does not exist"}
			console.log("Public tweets does not exist");
		}
		return next();
	}
}
