const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()
const errorsController = require('./controllers/errors')
const sequelize = require('./config/database')

const Product = require('./models/product')
const User = require('./models/user')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

//Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use('/', shopRoutes)

app.use(errorsController.get404Page)

const PORT = process.env.PORT || 3000

sequelize.sync()
	.then(result => {
		// console.log(result)
		app.listen(PORT)
	})
	.catch(err => console.log('Sequelize Sync error:', err))

