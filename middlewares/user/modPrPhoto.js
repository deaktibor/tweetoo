/**
 * kezeli a profil fotó feltöltését
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo){
	const {fs, userModel} = objRepo;
	return (req, res, next) => {
		//Bad request
		if (typeof req.file === 'undefined'){
			return res.status(404).json({error: `Bad request`});
		}
		//Remove old photo with id
		if (typeof res.locals.user.photo_id !== 'undefined' && res.locals.user.photo_id !== null){
			// delete a file
			fs.unlink(`upload/photo/${res.locals.user.photo_id}`, (err) => {
				if (err) {
					next(new Error('Error delete old photo file'));
				}
			});
		}
		//Ad photo id to user data
		if (typeof req.file.filename !== 'undefined' && req.file.filename !== null){
			const userData = userModel.findOne({id: res.locals.user.id});
			res.locals.newUserData = {...userData, photo_id: req.file.filename}
		}

		return next();
	}
}
