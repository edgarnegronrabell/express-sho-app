const Product = require('../models/product')
const Order = require('../models/order')

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        isAuthenticated: req.session.isLoggedIn
      })
    })
    .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products)
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        isAuthenticated: req.session.isLoggedIn
      })
    })
    .catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
  const { productId } = req.params
  Product.findById(productId)
    .then(product => {
      console.log(product)
      res.render('shop/product-detail', {
        product,
        pageTitle: product.title,
        path: '/products',
        isAuthenticated: req.session.isLoggedIn
      })
    })
    .catch(err => console.log(err))
}


exports.getCart = (req, res, next) => {
  console.log(req.session)
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      console.log('getCart products:', user)
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: user.cart.items,
        isAuthenticated: req.session.isLoggedIn
      })
    })
    .catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
  const { productId } = req.body
  Product.findById(productId)
    .then(product => {
      return req.user.addToCart(product)
    })
    .then(result => {
      console.log('postCart function result', result)
      res.redirect('/cart')
    })
    .catch(err => {
      console.log(err)
    })
}

exports.deleteCartItem = (req, res, next) => {
  const { productId } = req.body
  req.user
    .removeFromCart(productId)
    .then(result => {
      res.redirect('/cart')
    })
    .catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } }
      })
      console.log('postOrder function:', products)
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
    })
      return order.save()
  })
    .then(result => {
      return req.user.clearCart()
    }).then(() => {
      res.redirect('/orders')
    })
    .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
  Order
    .find({ "user.userId": req.user._id })
    .then(orders => {
      console.log('Orders:', orders)
      res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders',
        orders,
        isAuthenticated: req.session.isLoggedIn
      })
    })
    .catch(err=> console.log(err))
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
    isAuthenticated: req.session.isLoggedIn
  })
}
