module.exports = function (objRepo){
	const {db,tweetModel} = objRepo;
	return (req, res, next) => {

		if (typeof req.params.id === 'undefined'){
			return next(new Error('Tweet id is required'));
		}

		res.locals.delTweet = tweetModel.findOne({id: req.params.id, user_id: res.locals.user.id});

		if (!res.locals.delTweet.id){
			return next(new Error('Tweet does not exist'));
		}else {
			tweetModel.remove(res.locals.delTweet);
			db.saveDatabase(next);
		}
	}
}
