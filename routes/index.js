//User middleware
const authMW = require('../middlewares/user/auth');
//const loginMW = require('../middlewares/user/login');
const logoutMW = require('../middlewares/user/logout');
const addPrPhotoMW = require('../middlewares/user/addPrPhoto');
const delPrPhotoMW = require('../middlewares/user/delPrPhoto');
const matchPassMailMW = require('../middlewares/user/matchPassMail');
const saveNewMailMW = require('../middlewares/user/saveNewMail');
const saveNewPassMW = require('../middlewares/user/saveNewPass');
const saveRegMW = require('../middlewares/user/saveReg');
const sendPassMailMW = require('../middlewares/user/sendPassMail');
const validEditMailMW = require('../middlewares/user/validEditMail');
const validEditPassMW = require('../middlewares/user/validEditPass');
const validLogMW = require('../middlewares/user/validLog');
const validRegMW = require('../middlewares/user/validReg');

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
const updateTwMW = require('../middlewares/tweet/updateTW')
const findMyTwMW = require('../middlewares/tweet/findMyTw')

//General middleware
const renderMW = require('../middlewares/render');
const searchMW = require('../middlewares/search');
const errorHandlerMW = require('../middlewares/errorHandler');
const sessionMW	= require('../middlewares/sessionHandler')

//Validation service
const validation = require('../services/validation');
//ID ggenerator sevice
const id = require('../services/id')

module.exports = function (app, db, userModel, tweetModel) {
	const objRepo = {
		db,
		userModel,
		tweetModel,
		validation,
		id
	};

		//Fooldal (home screen|
		app.get('/',
			authMW(objRepo),
			findMyTwMW(objRepo),
			renderMW(objRepo, 'index'));

		//Registracio screen
		app.get('/reg',
			renderMW(objRepo, 'registration'));
		//Registracio
		app.post('/reg',
			validRegMW(objRepo),
			saveRegMW(objRepo),
			(req, res, next) => res.redirect('/'));

		//Login screen
		app.get('/login',
			renderMW(objRepo, 'login'));
		//Login
		app.post('/login',
			validLogMW(objRepo),
			sessionMW(objRepo),
			(req, res, next) => res.redirect('/'));

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

			//TODO Implemented
		//Profil screen (fiok)
		app.get('/profile',
			authMW(objRepo),
			renderMW(objRepo, 'profile'));

		//Profil foto hozaadasa (add profile photo)
		app.get('/profile/addphoto',
			authMW(objRepo),
			addPrPhotoMW(objRepo),
			renderMW(objRepo, 'profile'));

		//Profil foto torlese (delete profile photo)
		app.get('/profile/delphoto',
			authMW(objRepo),
			delPrPhotoMW(objRepo),
			renderMW(objRepo, 'profile'));

		//Kereses screen (search screen)
		app.get('/search',
			authMW(objRepo),
			renderMW(objRepo, 'search'));
			//Kereses (search)
		app.post('/search/param',
			authMW(objRepo),
			searchMW(objRepo),
			renderMW(objRepo, 'search'));

		//Elfelejtett jelszó keresése screen
		app.get('/forgotpass',
			renderMW(objRepo, 'forgotpass'));
		//Elfelejtett jelszó keresése
		app.post('/forgotpass',
			matchPassMailMW(objRepo),
			sendPassMailMW(objRepo),
			renderMW(objRepo, 'index'));

		//Email cím módosítása screen
		app.get('/profile/editmail',
			authMW(objRepo),
			renderMW(objRepo, 'editmail'));
		//Email cím módosítása
		app.post('profile/editmail',
			authMW(objRepo),
			validEditMailMW(objRepo),
			saveNewMailMW(objRepo),
			renderMW(objRepo, 'profile'));

		//Jelszó módosítasa screen
		app.get('/profile/editpass',
			authMW(objRepo),
			renderMW(objRepo, 'editpass'));
		//Jelszó módosítasa
		app.post('/profile/editpass',
			authMW(objRepo),
			validEditPassMW(objRepo),
			saveNewPassMW(objRepo),
			renderMW(objRepo, 'profile'));

		//Kijelentkezes (logout)
		app.get('/logout',
			logoutMW(objRepo),
			(req, res) => res.redirect('/'));

		//General error handling for all middleware chain
		app.use(errorHandlerMW());

	return app;
}
