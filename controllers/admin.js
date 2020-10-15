const Product = require('../models/product')


exports.getAddProductPage = (req, res, next) => {
  res.render('admin/add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product', 
	})
}

exports.postProduct = (req, res, next) => {
  const product = new Product(req.body.title)
	product.save()
	res.redirect('/')
}

exports.getProducts = (req, res, next) => {
        Product.fetchAll((products) => {
                res.render('admin/products-list', {
                        prods: products,
                        pageTitle: 'Admin Products',
                        path: '/admin/products'
                })
        })
} 
