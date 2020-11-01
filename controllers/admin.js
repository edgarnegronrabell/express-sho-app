const Product = require('../models/product')

exports.getAddProductPage = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  })
}

exports.postProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body
  const product = new Product({ 
    title, 
    price, 
    description, 
    imageUrl,
    userId: req.session.user
  })
  product
    .save()
    .then(result => {
      console.log('Product created successfully.')
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}

exports.getEditProductPage = (req, res, next) => {
  console.log('Edit Product Request:', req.query)
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const { productId } = req.params
  Product.findById(productId)
    .then(product => {
      console.log(product)
      if (!product) {
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        product: product,
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        isAuthenticated: req.session.isLoggedIn
      })
    })
    .catch(err => console.log(err))
}

exports.editProduct = (req, res, next) => {
  const { productId, title, imageUrl, description, price } = req.body
  
  Product
    .findById(productId)
    .then(product => {
      console.log(product)
      product.title = title,
      product.price = price
      product.description = description
      product.imageUrl = imageUrl
      console.log(product)
      return product
        .save()
    })
    .then(result => {
      console.log('Product Updated Successfully')
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('admin/products-list', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
        isAuthenticated: req.session.isLoggedIn
      })
    })
    .catch(err => console.log(err))
}

exports.deleteProduct = (req, res, next) => {
  const { productId } = req.body
  Product.findByIdAndRemove(productId)
    .then(() => {
      console.log('Product deleted successfully.')
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}
