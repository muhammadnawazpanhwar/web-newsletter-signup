const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var email = req.body.email;

  // console.log(fname , lname , email);

  var data = {
    memebers : [
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME: firstname,
          LNAME: lastname,
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us5.api.mailchimp.com/3.0/lists/4720a88e23",
    method: "POST",
    headers:{
      "Authorization" : "MNP786 402d1e7586f43661cef298cf18840d95-us5"
    },
    body: jsonData,
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
        if(response.statusCode===200){
          res.sendFile(__dirname + "/success.html");
       }else{
         res.sendFile(__dirname + "/failure.html");
       }
    }
  });
});

app.post("/failure" , function(req , res){
  res.redirect("/");
});

// app.listen(3000, function() { //the app will run only locallly
//   console.log("server is runing on port 3000");
// });

// app.listen(process.env.PORT, function() { //let heroku decide to choose the port for our app, the app cannot run locally
//   console.log("server is runing on port 3000");
// });

app.listen(process.env.PORT || 3000, function() { // the app will run locally as well as remotely(on the port chosen by heroku)
  console.log("server is runing on port 3000");
});

// <!-- API KEY
// 402d1e7586f43661cef298cf18840d95-us5 -->
//
// <!-- list id
// 4720a88e23 -->
