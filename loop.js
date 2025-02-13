const { json } = require('express');
var mysql = require('mysql');

var con = mysql.createConnection
({
    host: "localhost",
    user: "root",
    port: 3306, 
    password: "Sabareesh_3936",
    database: "amulmilk",
    multipleStatements: true
});


// con.connect((err) => 
// {
//     if (err) 
//     {
//         console.error("Error connecting to MySQL:", err);
//     } else 
//     {
//         console.log("Connected to MySQL!");
//     }
// });


var sql = "";


for (let i = 1; i < 4; i += 2) {
    sql = sql + "select * from milkdetails where id = " + i + "; ";
}
console.log("Query log: " + sql);

con.query(sql,function (err, results) {
    if (err) {
        console.error("Error: " + err.message);
    } else {
        console.log("Success: " + JSON.stringify(results));
    }
});
