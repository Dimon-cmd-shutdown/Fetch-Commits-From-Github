let sql;
const sqlite3 = require('sqlite3').verbose()
const path = require('path')

//connect to DB
const db = new sqlite3.Database(path.resolve(__dirname, 'test.db'), sqlite3.OPEN_READWRITE, (error) => {
    if (error) return console.log(error.message)
})

//Create table
// sql = `CREATE TABLE authUsers(id INTEGER PRIMARY KEY, username, password, JWT_token)`
// db.run(sql)


//Drop table
// db.run('DROP TABLE authUsers')

//Insert data into table
// sql = `INSERT INTO authUsers(username, password, JWT_token) VALUES (?,?,?)`
// db.run(sql, ['Mike', 'Mike112233', 'dfsfdsf,alsdfldmlfmdsaasdasdasfdsfdsagdsgdsgl;dassadgagafdgsdgdssflsdl;fm'], (error) => {
//     if (error) return console.log(error.message)
// })


//Update data
// sql = `UPDATE authUsers SET username = ? WHERE id = ?`
// db.run(sql, ['Jack', 2], (error) => {
//     if (error) return console.log(error.message)
// })

//Delete data
sql = `DELETE FROM authUsers WHERE id = ?`
db.run(sql, [1], (error) => {
    if (error) return console.log(error.message)
})


//query the data
sql = `SELECT * FROM authUsers`
db.all(sql, [], (error, rows) => {
    if (error) return console.log(error.message)
    rows.forEach(row => {
        console.log(row)
    })
})

