const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()
const errorsController = require('./controllers/errors')
const sequelize = require('./config/database')
const PORT = process.env.PORT || 3000

const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const { belongsTo } = require('./models/product')

//Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
	User.findByPk(1)
	.then(user => {
		//Saves a user as a sequelize object with sequelize methods into the request.
		req.user = user
		next()
	})
	.catch(err => console.log(err))
})

app.use('/admin', adminRoutes)
app.use('/', shopRoutes)

app.use(errorsController.get404Page)

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem} )
Product.belongsToMany(Cart, { through: CartItem} )



sequelize
	// .sync( {force: true} )
	.sync()
	.then(result => {
		return User.findByPk(1)
		// console.log(result)
	})
	.then(user => {
		if (!user) {
			return User.create({ name: 'Max', email: 'test@test.com'})
		}
		return user
	})
	.then(user => {
		// console.log(user)
		return user.createCart()
	})
	.then(cart => {
		app.listen(PORT)
	})
	.catch(err => console.log('Sequelize Sync error:', err))

