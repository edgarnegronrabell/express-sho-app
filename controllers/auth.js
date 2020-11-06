const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const User = require('../models/user')

const transporter = nodemailer.createTransport(sendgridTransport({
	auth : {
		api_key: process.env.API_KEY
	}
})) 

exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
		pageTitle: 'Login',
		errorMessage: req.flash('error')
  })
}

exports.postLogin = (req, res, next) => {
	const { email, password } = req.body
  User.findOne({ email })
    .then(user => {
			if (!user) {
				req.flash('error', 'Invalid email or password')
				return res.redirect('/login')
			}
        bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if(doMatch) {
            req.session.isLoggedIn = true
            req.session.user = user
            return req.session.save(err => {
            
              return res.redirect('/')
            })
          }
					req.flash('error', 'Invalid email or password')
					res.redirect('/login')
        })
        .catch(err => {
          console.log(err)
          res.redirect('/')
        })
    })
    .catch(err => console.log(err))
}

exports.getSignupPage = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Sign Up',
		errorMessage: req.flash('error')
  })
}

exports.postSignup = (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(userDoc => {
      if (userDoc) {
				req.flash('error', 'Email is being used already. Please pick a different one.')
        return res.redirect('/signup')
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            username,
            email,
            password: hashedPassword,
            cart: { items: [] },
          })
          return user.save()
        })
        .then(result => {
          res.redirect('/login')
					return transporter.sendMail({
						to: email,
						from: 'edgar.negron.rabell@gmail.com',
						subject: 'Sign up Successfull!',
						html: '<h1>You\'ve signed up successfully</h1>'
					})
						.catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
		errorMessage: req.flash('error')
  })
}

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err)
    res.redirect('/')
  })
}
