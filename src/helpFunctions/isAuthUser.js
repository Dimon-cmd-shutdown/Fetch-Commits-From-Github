const db = require('../db/sqlite')
const bcryptjs = require('bcryptjs')
let sql
const JWTstore = []

const helper = (username, password, storage) => {
    sql = `SELECT password, JWT_token FROM authUsers WHERE username="${username}"`
    db.all(sql, [], (error, row) => {
        if (error) return console.log(error.message)
        if (bcryptjs.compare(password, row[0].password)) {
            storage.push(row[0].JWT_token)
        }
    })
}

const isAuthUser = (callback) => {
    setTimeout(() => {
        callback(JWTstore)
    }, 20)
}

module.exports = {
    helper
}



// helper('Dima', 'dimon11', JWTstore)













