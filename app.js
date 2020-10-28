const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config()
const errorsController = require('./controllers/errors')
const PORT = process.env.PORT || 3000
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
    .findById("5f99c2d77e6b5f0598cb1469")
    .then(user => {
			req.user = user
			next()
	})
		.catch(err => console.log(err))
})

app.use('/admin', adminRoutes)
app.use('/', shopRoutes)

app.use(errorsController.get404Page)
mongoose.connect(
        process.env.MONGO_DB_URI, 
        { useNewUrlParser: true, 
          useUnifiedTopology: true,
	  useFindAndModify: false 
        })
	.then(result => {
		User
			.findOne()
			.then(user => {
				if (!user ) {
          const user = new User({
          	name: 'EdgarNegronRabell',
            email: 'edgar.negron.rabell@gmail.com',
            cart: {
            	items: []
            }
          })
          user.save()
				}
			})
    	app.listen(PORT)	
		})
	.catch(err => console.log(err))

