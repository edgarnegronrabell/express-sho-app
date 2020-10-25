const mongodb = require('mongodb')
const getDb = require('../config/database').getDb

class Product {
  constructor(title, imageUrl, description, price, id, userId) {
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
    this._id = id ? new mongodb.ObjectId(id) : null
    this.userId = userId
  }
  save() {
    const db = getDb()
    let dbOperation
    if (this._id) {
      dbOperation = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this })
    } else {
      dbOperation = db.collection('products').insertOne(this)
    }
    return dbOperation
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static fetchAll() {
    const db = getDb()
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products)
        return products
      })
      .catch(err => console.log(err))
  }

  static findById(productId) {
    const db = getDb()
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectId(productId) })
      .next()
      .then(product => {
        console.log(product)
        return product
      })
      .catch(err => {
        console.log(err)
      })
  }
  static deleteById(productId) {
    const db = getDb()
    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectId(productId) })
      .then(result => {
			})
      .catch(err => console.log(err))
  }
}

module.exports = Product
