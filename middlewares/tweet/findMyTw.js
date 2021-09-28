module.exports = function (objRepo){
	const {tweetModel, userModel} = objRepo;
	return (req, res, next) => {

		const isSearch = req.query.search
		//Find data
		const rawData = tweetModel
			.chain()
			.find({ isPublic: true, text: {'$contains' : isSearch ?? '' }})
			.simplesort('publicTimestamp', {desc: true})
			.offset(req.skip)
			.limit(req.query.limit)
			.eqJoin(userModel, 'user_id', 'id')
			.data();

		//Transform data
		res.locals.contentTweets = rawData.map((joinData) => {
			const container = {
				tweet: {...joinData.left,
					loveCount: joinData.left.love_id.length,
					isLoved: Boolean(joinData.left.love_id.find(e => e === res.locals.user.id))
				},
				user: {...joinData.right}
			};

			return container;
		});

		//Chceck is empty
		if (Object.keys(res.locals.contentTweets).length === 0) {
			res.locals.rendAlert = {
				type: "alert-danger",
				message: "Tweets not found"
			}
		}
		return next();
	}
}

