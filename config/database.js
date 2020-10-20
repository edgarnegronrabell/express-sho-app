const mysql = require('mysql2')

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'node_complete',
	password: 'p4$$w0Rd'
})

module.exports = pool.promise()