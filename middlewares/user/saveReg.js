/**
 * elmenti az reg adatokat a DB-be
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo){
	const {db, userModel, id} = objRepo;
	return (req, res, next) => {
		userModel.insert({
			id: id.getNewId(),
			email: res.locals.regData.email,
			password: res.locals.regData.password,
			nickname: res.locals.regData.nickname,
			secret: id.getNewId(),
			tweet: [],
			photo_id: null
		});
		db.saveDatabase(next);
	}
}

//TODO V2 crypt pass
