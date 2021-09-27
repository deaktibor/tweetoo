module.exports = function (objRepo){
	const {db, tweetModel} = objRepo;
	return (req, res, next) => {
		//Update
		tweetModel.update(res.locals.newTweetModel);
		db.saveDatabase(next);
	}
}
