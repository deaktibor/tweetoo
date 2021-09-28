const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const session = require('express-session');
const LokiStore = require('connect-loki')(session);
const initdb = require('./services/db');
const appRoutes = require('./routes');


// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/**
 *express session init
 */
app.use(session({
	store: new LokiStore({path: './data/session-store.db'}),
	secret: '032f75b3ca02a393196a818328bd32e8',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
}))
/**
 * EJS templating system
 */
app.set('view engine', 'ejs');

/**
 *Enable static files
 */
app.use('/public',express.static('public'));
app.use('/upload/photo', express.static('upload/photo'));

/**
 * Init
 */
initdb((err, db, userModel, tweetModel) =>{
	if (err){
		return console.error(err);
	}
	/**
	 * Routes
	 */
	appRoutes(app, db, userModel, tweetModel)

	app.listen(port, () => {
		console.log(`tweetoo working on http://localhost:${port}`)
	})
})

