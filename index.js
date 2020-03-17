var mysql = require('mysql');
var path = require('path');
var bodyparser = require('body-parser');
var express = require('express');
var app = express();

var con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'sampledb'
});

app.use(bodyparser.urlencoded({extended : false }));
app.use(bodyparser.json());

// app.method(path,handler);==== Here, app is an object, method is an http request(GET,POST,DELETE,PUT),Path is an url path, handler is an callback function
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/index.html', function(req,res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/register.html', function(req,res){
  res.sendFile(path.join(__dirname + '/register.html'));
  console.log('requested to open register page,....')
});

app.get('/login.html', function(req, res){
  res.sendFile(path.join(__dirname + '/login.html'));
  console.log('requested to open login page,.......');
})

app.post('/login', function(req,res){
  var Email = req.body.Email;
  var Cpass = req.body.Cpass;
  
  // con.connect(function(err){
    // if(err) throw err;
    // console.log('can retrive data');html,css,bootstrap,javascript,jquery,angular,nodejs,mysql
    var sql = "SELECT * FROM mysampletable WHERE Email = ? AND Cpass = ?";
    con.query(sql,[Email,Cpass],function(err, results, fields){
      if (err) {
     throw err;
      }else{
        if(results.length >0){
          if(results[0].Cpass == Cpass){
            res.send({
              "success":"login sucessfull",
              'email': req.body.Email,
              'password' : req.body.Cpass
                });
          }
        }
        else{
          res.send({
            "failed ":"Hmm, we don't recognize that email. Please try again.",
            " please enter" : "valid email address and password...! ",
            'email' : req.body.Email,
            'password' : req.body.Cpass
              });
        }
      }
    });
  // });
});

app.post('/register',function(req,res){

  var Fname = req.body.Fname;
  var Lname = req.body.Lname;
  var Email = req.body.Email;
  var Cpass = req.body.Cpass;
  var Rpass = req.body.Rpass;
  var telephone = req.body.telephone;
  res.write('you sent the Fname "' + req.body.Fname + '".\n');
  res.write('you sent the Lname "' + req.body.Lname + '".\n');
  res.write('you sent the Email "' + req.body.Email + '".\n');
  res.write('you sent the Cpass "' + req.body.Cpass + '".\n');
  res.write('you sent the Rpass "' + req.body.Rpass + '".\n');
  res.write('you sent the telephone "' + req.body.telephone + '".\n');

  // con.connect(function(err){
    //  if(err) throw err;
    // console.log('connected');
    var sql = "INSERT INTO mysampletable(Fname,Lname,Email,Cpass,Rpass,telephone) VALUES ('"+Fname+"','"+Lname+"','"+Email+"','"+Cpass+"','"+Rpass+"','"+telephone+"')";
    con.query(sql,function(err, results){
      if(err) throw err;
      console.log('1 record inserted');
    });
  // });
 
}); 

app.listen(3300);

console.log("Running at Port 3300");