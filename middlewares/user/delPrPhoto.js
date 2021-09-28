/**
 * kezeli a mar feltoltott profil fotó törléset
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo){
	const {fs, userModel} = objRepo;
	return (req, res, next) => {
		//Bad request
		if (typeof req.params.id === 'undefined'){
			return next(new Error('Tweet id is required'));
		}
		//Delete id from user photo_id
		if (typeof req.params.id!== 'undefined' && req.params.id !== null){
			// delete a file
			fs.unlink(`upload/photo/${req.params.id}`, (err) => {
				if (err) {
					next(new Error('Error delete photo file'));
				}
			});
			const userData = userModel.findOne({id: res.locals.user.id});
			res.locals.newUserData = {...userData, photo_id: null}
		}
		return next();
	}
}
