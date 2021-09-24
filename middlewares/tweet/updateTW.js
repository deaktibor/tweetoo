module.exports = function (objRepo){
	const {db, tweetModel} = objRepo;
	return (req, res, next) => {
		//Update
		tweetModel.update(res.locals.newTweetModel);
		db.saveDatabase((err) =>{
			if (err){
				return next(err);
			} else{
				return next();
			}
		})
	}
}
