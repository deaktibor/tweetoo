module.exports = function (objRepo){
	const {validation} = objRepo;
	return (req, res, next) => {
		//default
		res.locals.rendAlert = {};
		//Bad request
		if (req.body.tweetText === 'undefined'){
			return res.status(404).json({error: `Bad request`});
		}
		//Validate tweet text
		const tweetText = req.body.tweetText;
		const result = validation.validateTweetText({tweetText});
		//Check result
		if (result.error){
			res.locals.rendAlert = {
				type: "alert-danger",
				message: `${result.error.message}`}
			return res.render("tweet", res.locals);
		}else {
			res.locals.tweetText = result.value.tweetText;
			return next();
		}
	}
}
