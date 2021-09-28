/**
 * session alapján ellenőrzi a felhasználót, ha nincs bejelentkezve akkor átirányít a főoldalra (homescreen)
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo){
	const {tweetModel, userModel} = objRepo;
	return (req, res, next) => {
		res.locals.pageCount = 0;
		//Chceck user session
		if (typeof req.session.user === 'undefined'){
			//Visitor
			//Some content for visitor
			const joinData = tweetModel
				.chain()
				.find({isPublic: true})
				.simplesort('publicTimestamp', {desc: true})
				.limit(5)
				.eqJoin(userModel, 'user_id', 'id')
				.data();

			res.locals.contentTweets = joinData.map((joinData) => {
				const container = {
					tweet: {
						...joinData.left,
						loveCount: joinData.left.love_id.length,
					},
					user: {...joinData.right}
				};
				return container;
			})

			if (Object.keys(res.locals.contentTweets).length === 0){
				res.locals.rendAlert = {
					type: "alert-danger",
					message: "Public tweets does not exist"}
				console.log("Public tweets does not exist");
			}


		res.locals.rendAlert = {
				type: "alert-primary",
				message: "Please login to access all functionality"}
		return res.render('index', res.locals);
		}

		//User
		res.locals.user = req.session.user;
		//set to default
		res.locals.matchTweet = {};
		res.locals.delTweet = {};
		res.locals.contentTweets = [];

		return next();
	}
}
