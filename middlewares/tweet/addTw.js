module.exports = function (objRepo){
	const {id} = objRepo;
	return (req, res, next) => {

		//Bad request
		if (typeof req.body.tweetSaveBtn === 'undefined' && typeof req.body.tweetPublicBtn === 'undefined'){
			return res.status(404).json({error: `Bad request`});
		}

		const isSave = typeof req.body.tweetSaveBtn !== 'undefined';
		const isPublic = typeof req.body.tweetPublicBtn !== 'undefined';
		let newTweetModel ={};

		if (isSave || isPublic){
			newTweetModel = {
				id: id.getNewId(),
				user_id: res.locals.user.id,
				text: res.locals.tweetText,
				isPublic: !!isPublic,
				publicTimestamp: isSave ? null : Date.now(),
				love_id: []
			};
		}

		//Pass new tweet to res.locals
		if (Object.keys(newTweetModel).length === 0){
			return next(new Error('Add new tweet error'));
		}else {
			res.locals.newTweetModel = newTweetModel;
			return next();
		}
	}
}
