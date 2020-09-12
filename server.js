if (process.env.NODE_ENV !== 'production') {
	// this checkes if the process is runing in the production environment, if not we set it through the .env file. We dont want to load this .env environment variable when we are in development
	require('dotenv').config();
	//	console.log(process.env);
}
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const indexRouter = require('./routes/index');

//set the view engine
app.set('view engine', 'ejs'); // bascally a template engine
app.set('views', __dirname + '/views'); // this line can also be excluded
// hookup express layouts
app.set('layout', 'layouts/layout'); //settting the layout path //different views are placed inside these templates and rendered, automating the similar stuff repeating in each page
//tell express we using expresslayouts
app.use(expressLayouts);
//setup public
app.use('/static', express.static('public')); //url is "/static" and "public" is relative path

/**
 * SETUP MONGO DB
 */
const mongoose = require('mongoose');

//console.log(`this is the URL : ${process.env.DATABASE_URL}`);
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('mongoose has started'));

//setup routes
app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);
