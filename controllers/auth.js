const User = require('../models/user')

exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn,
  })
}

exports.postLogin = (req, res, next) => {
  User.findById('5f99c2d77e6b5f0598cb1469')
    .then(user => {
      req.session.isLoggedIn = true
      req.session.user = user
      return req.session.save(err => {
        console.log(err)
        res.redirect('/')
      })
    })
    .catch(err => console.log(err))
}

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err)
    res.redirect('/')
  })
}
