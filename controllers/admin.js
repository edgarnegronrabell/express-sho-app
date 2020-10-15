const Product = require('../models/product')


exports.getAddProductPage = (req, res, next) => {
  res.render('admin/add-product', {
		prods: products,
		pageTitle: 'Add Product',
		path: '/admin/add-product', 
		formsCSS: true,
		productCSS: true,
		activeAddProduct: true
	})
}

exports.postProduct = (req, res, next) => {
  const product = new Product(req.body.title)
	product.save()
	res.redirect('/')
}