const bcrypt = require('bcryptjs')

const User = require('../models/user')

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
              console.log(err)
             return res.redirect('/')
            })
          }
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
  })
}

exports.postSignup = (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(userDoc => {
      if (userDoc) {
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
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
  })
}

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err)
    res.redirect('/')
  })
}
