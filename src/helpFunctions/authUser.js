const db = require('../db/sqlite')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
let sql

const signUpUser = async (username, password) => {
    const id = Date.now()
    password = await bcryptjs.hash(password, 8)
    const JWT_token = jwt.sign({ _id: id }, process.env.JWT_SECRET)
    sql = `INSERT INTO authUsers(id, username, password, JWT_token) VALUES (?,?,?,?)`
    db.run(sql, [id, username, password, JWT_token], (error) => {
        if (error) return console.log(error.message)
    })
}

// sql = `SELECT * FROM authUsers`
// db.all(sql, [], (error, rows) => {
//     if (error) return console.log(error.message)
//     rows.forEach(row => {
//         console.log(row)
//     })
// })

module.exports = signUpUser