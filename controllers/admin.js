const Product = require('../models/product')

exports.getAddProductPage = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
		path: '/admin/add-product',
		editing: false
  })
}

exports.postProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body
  const product = new Product(null, title, imageUrl, description, price)
  product.save()
  res.redirect('/')
}

exports.getEditProductPage = (req, res, next) => {
	console.log('Edit Product Request:', req.query)
	const editMode = req.query.edit
	if (!editMode) {
		return res.redirect('/')
	}
	const { productId }  = req.params
	console.log(productId)
	Product.findById(productId, product => {
		console.log(product)
		if (!product) {
			return res.redirect('/')
		}
		res.render('admin/edit-product', {
			product: product,
			pageTitle: 'Edit Product',
			path: '/admin/edit-product',
			editing: editMode
		})
	})
}

exports.editProduct = (req, res, next) => {
	const { productId, title, imageUrl, description, price } = req.body
	const updatedProduct = new Product(productId, title, imageUrl, description, price)
	updatedProduct.save()
	res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products-list', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    })
  })
}

exports.deleteProduct = (req, res, next) => {
	const { productId } = req.body
}