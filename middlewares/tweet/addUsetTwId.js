module.exports = function (objRepo){
	const {db, userModel} = objRepo;
	return (req, res, next) => {
		//Add tweet id to user/update user data
		let userData = userModel.findOne({id: res.locals.user.id});
		userData.tweet.push(res.locals.newTweetModel.id);
		userModel.update(userData);

		db.saveDatabase(next);
	}
}
