const User = require('../models/user')

exports.getLoginPage = (req, res, next) => {
//	const isLoggedIn = req
//			.get('Cookie')
//      .split(';')[1]
//      .trim()
//      .split('=')[1] === 'true'
	res.render('auth/login', {
		path: '/login',
		pageTitle: 'Login',
		isAuthenticated: req.session.isLoggedIn
	})
}

exports.postLogin = (req, res, next) => {
	User
    .findById("5f99c2d77e6b5f0598cb1469")
    .then(user => {
			req.session.isLoggedIn = true
			req.session.user = user
			res.redirect('/')
	})
		.catch(err => console.log(err))
}

exports.logout = (req, res, next) => {
	req.session.isLoggedIn = true
	res.redirect('/')
}
