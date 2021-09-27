module.exports = function (objRepo){
	const {db,tweetModel} = objRepo;
	return (req, res, next) => {

		if (typeof req.params.id === 'undefined'){
			return next(new Error('Tweet id is required'));
		}

		let tweetForPublic = tweetModel.findOne({id: req.params.id, user_id: res.locals.user.id});

		if (!tweetForPublic){
			return next(new Error('Tweet does not exist'));
		}else {
			let tweetPublic = {...tweetForPublic, isPublic: true, publicTimestamp: Date.now()}
			tweetModel.update(tweetPublic);

			db.saveDatabase(next);
		}
	}
}
