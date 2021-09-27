module.exports = function (objRepo) {
	const {db,tweetModel} = objRepo;
	return (req, res, next) => {
		//Check if tweet is my
		if (res.locals.user.id === res.locals.matchTweet.user_id) {
			return next();
		}
		//Right dada check
		if (Array.isArray(res.locals.matchTweet.love_id)) {
			//Check the user has already clicked
			const result = res.locals.matchTweet.love_id.find(e => e === res.locals.user.id)
			if (result) {
				//UNLOVE
				//Remove user id from tweet love_id
				let newTweetUnloveArray = res.locals.matchTweet.love_id.filter(e => e !== res.locals.user.id);
				let unloveTweet = {...res.locals.matchTweet, love_id: newTweetUnloveArray};
				tweetModel.update(unloveTweet);
				db.saveDatabase(next);
				return next();
			}
			//LOVE
			//Add user id to tweet lode_id
			let loveTweet = {...res.locals.matchTweet};
			loveTweet.love_id.push(res.locals.user.id);
			tweetModel.update(loveTweet);
			db.saveDatabase(next);
			return next();
		} else {
			return next(new Error('Tweet love_id error'));
		}
	}
}
