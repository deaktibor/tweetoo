const loki = require('lokijs');

/*
userModel
-id
-email
-password
-nickname
-secret
-tweet[…]	Array of tweet id

tweetModel
-id
-user_id
-text
-isPublic
-publicTimestamp
-love_id[…]		Array of user id
*/

module.exports = function initdb(cb){
	const db = new loki('./data/database.db');
	db.loadDatabase({},err => {

		let userModel = db.getCollection("userModel");
		if (userModel === null){
			userModel = db.addCollection("userModel",{
				indices: ["id", "email"],
				unique: ["email", "nickname"]
			});
		}

		let tweetModel = db.getCollection("tweetModel");
		if (tweetModel === null){
			tweetModel = db.addCollection("tweetModel",{
				indices:["id", "user_id"]
			});
		}

		db.saveDatabase(err => {
			cb(err,db, userModel, tweetModel);
		})
	})
}



