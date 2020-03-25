const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

const db = require('./models')
const Todo = db.Todo
const User = db.User

const MySQLStore = require('express-mysql-session')(session);

const options = {
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB,
};

const sessionStore = new MySQLStore(options);

app.use(session({
  secret: 'secert for todo list',
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,  // one day
  },
}))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

app.use(flash())

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// require routes
app.use('/', require('./routes/home'))
app.use('/todos', require('./routes/todos'))
app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auths'))

app.listen(process.env.PORT || port, () => {
  console.log(`App is running on localhost:${port}`)
})
