var mysql = require('mysql');



var con = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "1234",

  database: "map" 

});



con.connect(function(err) {

  if (err) throw err;

  var sql = "SELECT * FROM map.festival";

  con.query(sql, function (err, result, fields) {

    if (err) throw err;

    console.log(result);

  });

});