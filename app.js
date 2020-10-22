const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()
const errorsController = require('./controllers/errors')
const PORT = process.env.PORT || 3000
const mongoConnect = require('./config/database')
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
//const shopRoutes = require('./routes/shop')

//Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
//	User.findByPk(1)
//	.then(user => {
		//Saves a user as a sequelize object with sequelize methods into the request.
//		req.user = user
//		next()
//	})
	//	.catch(err => console.log(err))
})

app.use('/admin', adminRoutes)
//app.use('/', shopRoutes)

app.use(errorsController.get404Page)
mongoConnect((client) => {
	console.log(client)
	app.listen(PORT)
})
