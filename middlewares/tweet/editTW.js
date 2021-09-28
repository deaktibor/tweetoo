module.exports = function (objRepo){
	return (req, res, next) => {


		//Bad request
		if (typeof req.body.tweetSaveBtn === 'undefined' && typeof req.body.tweetPublicBtn === 'undefined'){
			return res.status(404).json({error: `Bad request`});
		}

		const isSave = typeof req.body.tweetSaveBtn !== 'undefined';
		const isPublic = typeof req.body.tweetPublicBtn !== 'undefined';
		let newTweetModel ={};

		if (isSave || isPublic){
			newTweetModel = {...res.locals.matchTweet,
				id: res.locals.matchTweet.id,
				user_id: res.locals.matchTweet.user_id,
				text: res.locals.tweetText,
				isPublic: !!isPublic,
				publicTimestamp: isSave ? null : Date.now(),
				love_id: res.locals.matchTweet.love_id
			};
		}

		//Pass new tweet to res.locals
		if (Object.keys(newTweetModel).length === 0){
			return next(new Error('Edit tweet error'));
		}else {
			res.locals.newTweetModel = newTweetModel;
			return next();
		}
	}
}
