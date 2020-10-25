const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()
const errorsController = require('./controllers/errors')
const PORT = process.env.PORT || 3000
const mongoConnect = require('./config/database').mongoConnect
const User = require('./models/user')
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

//Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
	User
    .findById("5f945edd8f0705a6156c4321")
    .then(user => {
	//Saves a user as a sequelize object with sequelize methods into the request.
		req.user = new User(user.username, user.email, user.cart, user._id)
		next()
	})
	.catch(err => console.log(err))
})

app.use('/admin', adminRoutes)
app.use('/', shopRoutes)

app.use(errorsController.get404Page)
mongoConnect(() => {
	app.listen(PORT)
})
