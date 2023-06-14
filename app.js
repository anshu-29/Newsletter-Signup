const express = require("express");
const bodyParser = require("body-parser")
const request = require("request");
// const port = 3000;
const https = require("https")
const {response} = require("express");
const app = express();


app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/static", function (req,res) {
    res.sendFile(__dirname + "/static/index.html")

})

app.post("/static",function (req,res) {
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

    var data= {
        members:[
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName,
                }


            }
        ]
    };
    var jsonData = JSON.stringify(data);


    const url = "https://us11.api.mailchimp.com/3.0/lists/2705c2a70e";
    const options = {
        method : "POST",
        auth : "Aakansh:5980a6c1aed61ca9582a69f736151ead-us11",
    }
const request = https.request(url,options, function (response) {

    if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");

    } else {
        res.sendFile(__dirname + "/failure.html");
    }


    response.on("data",function (data) {
        console.log(JSON.parse(data));

    })
})

    request.write(jsonData);
    request.end();


        

})

app.post("/failure", function (req,res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function () {
    console.log("Server is running at 3000")

})
// 5980a6c1aed61ca9582a69f736151ead-us11
// 2705c2a70e
