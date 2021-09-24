module.exports = function (objRepo){
	return (req, res, next) => {
		/*
		tweetModel
		-id
		-user_id
		-text
		-isPublic
		-publicTimestamp
		-love_id[…]		Array of user id
		*/
		//default
		let newTweetModel = {};
		//Bad request
		if (typeof req.body.tweetSaveBtn === 'undefined' && typeof req.body.tweetPublicBtn === 'undefined'){
			return res.status(404).json({error: `Bad request`});
		}

		//tweetSaveBtn
		if (typeof req.body.tweetSaveBtn !== 'undefined'){
			newTweetModel = {...res.locals.matchTweet,
				id: res.locals.matchTweet.id,
				user_id: res.locals.matchTweet.user_id,
				text: res.locals.tweetText,
				isPublic: false,
				publicTimestamp: null,
				love_id: res.locals.matchTweet.love_id
			};
		}
		//tweetPublicBtn
		if (typeof req.body.tweetPublicBtn !== 'undefined'){
			newTweetModel = {...res.locals.matchTweet,
				id: res.locals.matchTweet.id,
				user_id: res.locals.matchTweet.user_id,
				text: res.locals.tweetText,
				isPublic: true,
				publicTimestamp: Date.now(),
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
