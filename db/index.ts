const mysql = require('mysql');

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'chat-room',
    charset: 'utf8mb4'
})

export default db;