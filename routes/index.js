//User middleware
const authMW = require('../middlewares/user/auth');
const logoutMW = require('../middlewares/user/logout');
const modPrPhotoMW = require('../middlewares/user/modPrPhoto');
const delPrPhotoMW = require('../middlewares/user/delPrPhoto');
const matchPassMailMW = require('../middlewares/user/matchPassMail');
const saveEditedUserDataMW = require('../middlewares/user/saveEditedUserData');
const saveRegMW = require('../middlewares/user/saveReg');
const sendPassMailMW = require('../middlewares/user/sendPassMail');
const validEditMailMW = require('../middlewares/user/validEditMail');
const validEditPassMW = require('../middlewares/user/validEditPass');
const validLogMW = require('../middlewares/user/validLog');
const validRegMW = require('../middlewares/user/validReg');
const validForgotPassMW = require('../middlewares/user/validForgotPass')

//Tweet middleware
const addTwMW = require('../middlewares/tweet/addTw');
const matchTwMW = require('../middlewares/tweet/matchTw');
const readPrTwMW = require('../middlewares/tweet/readPrTw');
const saveTwMW = require('../middlewares/tweet/saveTw');
const validTwMW = require('../middlewares/tweet/validTw');
const addUserTwIdMW = require('../middlewares/tweet/addUsetTwId');
const delUserTwMW =require('../middlewares/tweet/delUserTwId');
const delTwMW = require('../middlewares/tweet/delTW');
const publicTwMW = require('../middlewares/tweet/publicTw');
const editTwMW = require('../middlewares/tweet/editTW');
const updateTwMW = require('../middlewares/tweet/updateTW');
const findMyTwMW = require('../middlewares/tweet/findMyTw');
const loveTwMW	= require('../middlewares/tweet/loveTw');
const matchTwLoveMW = require('../middlewares/tweet/matchTwLove')

//General middleware
const renderMW = require('../middlewares/render');
const searchMW = require('../middlewares/search');
const errorHandlerMW = require('../middlewares/errorHandler');
const sessionMW	= require('../middlewares/sessionHandler');
const pagMW = require('../middlewares/pag')

//Validation service
const validation = require('../services/validation');
//ID gen
const id = require('../services/id')
//fs
const fs = require("fs")
//Pagination
const paginate = require('express-paginate');
//Multer
const multer = require('multer');
const path = require('path');
//Multer storage
const uploadPhotoMW = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			return cb(null, './upload/photo')
		},
		filename: function (req, file, cb) {
			const rnd = Math.round(Math.random() * 1E9);
			const ext = path.extname(file.originalname).toLowerCase();
			return cb(null,`${file.fieldname}-${Date.now()}-${rnd}${ext}`);
		}
	})
})


/**
 *
 * @param app
 * @param db
 * @param userModel
 * @param tweetModel
 * @returns {*}
 */
module.exports = function (app, db, userModel, tweetModel) {
	const objRepo = {
		db,
		userModel,
		tweetModel,
		validation,
		id,
		fs,
		paginate,
	};

//**********************************************************************************************************************
		// Pagination
		app.use(paginate.middleware(10, 50));
//**********************************************************************************************************************
		//Fooldal (home screen|
		app.get('/',
			authMW(objRepo),
			findMyTwMW(objRepo),
			pagMW(objRepo),
			renderMW(objRepo, 'index'));
//**********************************************************************************************************************
		//Registracio screen
		app.get('/reg',
			renderMW(objRepo, 'registration'));
		//Registracio
		app.post('/reg',
			validRegMW(objRepo),
			saveRegMW(objRepo),
			(req, res, next) => res.redirect('/'));
//**********************************************************************************************************************
		//Login screen
		app.get('/login',
			renderMW(objRepo, 'login'));
		//Login
		app.post('/login',
			validLogMW(objRepo),
			sessionMW(objRepo),
			(req, res, next) => res.redirect('/'));
//**********************************************************************************************************************
		//Tweets screen
		app.get('/tweet',
			authMW(objRepo),
			readPrTwMW(objRepo),
			renderMW(objRepo, 'myTweets'));
		//Tweet screen (new/add, edit|
		app.get('/tweet/add',
			authMW(objRepo),
			//matchTwMW(objRepo),
			renderMW(objRepo, 'tweet'));
		//Tweet add/new
		app.post('/tweet/add',
			authMW(objRepo),
			validTwMW(objRepo),
			addTwMW(objRepo),
			saveTwMW(objRepo),
			addUserTwIdMW(objRepo),
			sessionMW(objRepo),
			(req, res, next) => res.redirect('/tweet'));
		//Tweet torlese del
		app.get('/tweet/del/:id',
			authMW(objRepo),
			delTwMW(objRepo),
			delUserTwMW(objRepo),
			sessionMW(objRepo),
			(req, res, next) => res.redirect('/tweet'));
		//Tweet publikalas public
		app.get('/tweet/public/:id',
			authMW(objRepo),
			publicTwMW(objRepo),
			(req, res) => res.redirect('/tweet'));
		//Tweet modositas screen (edit tweet)
		app.get('/tweet/edit/:id',
			authMW(objRepo),
			matchTwMW(objRepo),
			renderMW(objRepo, 'tweet'));
		//Tweet modositas
		app.post('/tweet/edit/:id',
			authMW(objRepo),
			matchTwMW(objRepo),
			validTwMW(objRepo),
			editTwMW(objRepo),
			updateTwMW(objRepo),
			(req, res) => res.redirect('/tweet'));
		//Tweet love
		app.post('/tweet/love/:id',
			authMW(objRepo),
			matchTwLoveMW(objRepo),
			loveTwMW(objRepo),
			(req, res) => res.redirect('/'));
//**********************************************************************************************************************
		//Profil screen (fiok)
		app.get('/profile',
			authMW(objRepo),
			renderMW(objRepo, 'profile'));
		//Profil foto hozaadasa (add profile photo)
		app.post('/profile/uploadphoto',
			authMW(objRepo),
			uploadPhotoMW.single('profilePhoto'),
			modPrPhotoMW(objRepo),
			saveEditedUserDataMW(objRepo),
			sessionMW(objRepo),
			(req, res) => res.redirect('/profile'));
		//Profil foto torlese (delete profile photo)
		app.get('/profile/delphoto/:id',
			authMW(objRepo),
			delPrPhotoMW(objRepo),
			saveEditedUserDataMW(objRepo),
			sessionMW(objRepo),
			(req, res) => res.redirect('/profile'));
//**********************************************************************************************************************
		//Kereses screen (search screen)
		app.get('/search',
			authMW(objRepo),
			renderMW(objRepo, 'search'));
		//Kereses (search)
		app.get('/search/tweet',
			authMW(objRepo),
			searchMW(objRepo),
			findMyTwMW(objRepo),
			pagMW(objRepo),
			renderMW(objRepo, 'search'));
//**********************************************************************************************************************
		//Elfelejtett jelszó keresése screen
		app.get('/forgotpass',
			renderMW(objRepo, 'forgotpass'));
		//Elfelejtett jelszó keresése
		app.post('/forgotpass',
			validForgotPassMW(objRepo),
			matchPassMailMW(objRepo),
			sendPassMailMW(objRepo),
			(req, res) => res.redirect('/'));
//**********************************************************************************************************************
		//Email cím módosítása screen
		app.get('/profile/editmail',
			authMW(objRepo),
			renderMW(objRepo, 'editmail'));
		//Email cím módosítása
		app.post('/profile/editmail',
			authMW(objRepo),
			validEditMailMW(objRepo),
			saveEditedUserDataMW(objRepo),
			sessionMW(objRepo),
			(req, res) => res.redirect('/profile'));
//**********************************************************************************************************************
		//Jelszó módosítasa screen
		app.get('/profile/editpass',
			authMW(objRepo),
			renderMW(objRepo, 'editpass'));
		//Jelszó módosítasa
		app.post('/profile/editpass',
			authMW(objRepo),
			validEditPassMW(objRepo),
			saveEditedUserDataMW(objRepo),
			(req, res) => res.redirect('/profile'));
//**********************************************************************************************************************
		//Kijelentkezes (logout)
		app.get('/logout',
			logoutMW(objRepo),
			(req, res) => res.redirect('/'));
//**********************************************************************************************************************
		//General error handling for all middleware chain
		app.use(errorHandlerMW());
//**********************************************************************************************************************

	return app;
}
