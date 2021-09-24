//General error handler
module.exports = function (){
	return (err, req, res, next) => {
		if (err){
			console.error(err.stack);
			res.status(500);
			return res.render("error");
		}
	}
}



