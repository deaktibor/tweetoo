module.exports = function (objRepo){
	const {db, userModel} = objRepo;
	return (req, res, next) => {
		//Add tweet id to user/update user data
		let userData = userModel.findOne({id: res.locals.user.id});
		let newTweetArray = userData.tweet.filter(e => e!== res.locals.delTweet.id);
		let newUserData = {...userData, tweet: newTweetArray};

		userModel.update(newUserData);

		db.saveDatabase((err) =>{
			if (err){
				return next(err);
			} else{
				return next();
			}
		})
	}
}
