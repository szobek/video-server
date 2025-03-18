const mysql = require('mysql2/promise');

async function connect(){
    return  mysql.createPool({
        host:'localhost',
        user:'root',
        password:'',
        database:'test',
        port:3306
    })
}
