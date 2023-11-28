var express    =  require("express");  
var app = express(); 
var mysql = require('mysql');
var path = require('path');
app.use(express.json());
var cors = require('cors');
app.use(cors());
 
var connection = mysql.createConnection({  
    host     : 'localhost',  
    user     : 'user',  
    password : '1234',  
    database : 'map',
    port : '3306',
  });

  connection.connect(function(err){  
    if(!err) {  
        console.log("Database is connected ... \n\n");    
    } else {  
        console.log("Error connecting database ... \n\n");    
    }  
    });  

    app.use(express.static(path.join(__dirname, '/build')));

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '/build/index.html'));
      });
      
      app.get('/festival', function (req, res) {
        connection.query('SELECT * FROM festival', function (err, results) {
          if (err) {
            console.log("축제 데이터를 가져오는 중 오류 발생:", err);
            res.status(500).json({ error: '축제 데이터를 가져오는데 실패했습니다' });
          } else {
            res.json(results);
          }
        });
      });
      
app.listen(9999, () =>{
    console.log('Server Running on Port 9999!');
});  