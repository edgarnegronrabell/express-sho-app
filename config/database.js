const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = callback => {
	MongoClient.connect(process.env.MONGO_DB_URI, { useUnifiedTopology: true }
	)
        .then(client => {
                console.log('Database connected')
		_db = client.db()
		callback()
        })
        .catch(err => {
		console.log(err)
		throw err;
	})
}

module.exports = mongoConnect
