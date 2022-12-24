const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const dotenv = require('dotenv');
const morgan = require('morgan');
const dataBase = require('./conf/dataBase');


//session with users
const passport = require('passport')
const session =require('express-session')

const MongoStore = require('connect-mongo');
dotenv.config({ path: "./conf/.env" });
// Passport config
require('./conf/passport')(passport)
//connect data base 

 dataBase();

//helpers
const {eq, ne}  = require('./helpers/formatLessons');
//session
// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.DB_STRING}),
  })
)

app.engine('.hbs', exphbs.engine({helpers: {eq,ne}, defaultLayout:'main',extname : '.hbs'}))
app.set('view engine', '.hbs')
app.use(express.static("public"));
app.use(express.static(__dirname));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if(process.env.NODE_ENV == 'devOps')
	app.use(morgan('dev'))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/lessons', require('./routes/lessons'))


const PORT = process.env.PORT || 5555
app.listen(PORT, console.log(` catch your app on ===> localhost:${PORT} <== with  ==> ${process.env.NODE_ENV}  mode`))
