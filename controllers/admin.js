const Product = require('../models/product')


exports.getAddProductPage = (req, res, next) => {
  res.render('admin/add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product', 
	})
}

exports.postProduct = (req, res, next) => {
	const { title, imageUrl, description, price } = req.body
  const product = new Product(title, imageUrl, description, price)
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
