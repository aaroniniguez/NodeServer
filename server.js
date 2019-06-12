const express = require('express'); 
const fs = require('fs');
const os = require('os');
const path = require('path');

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/nohup.out', {flags : 'a'});
console.log = function(...args){
	var myTime = new Date();
	myTime = myTime.toString().split("GMT")[0];
	log_file.write("\n====" + myTime + "====\n");
	args.forEach(function(element){
	   log_file.write(util.format(element) + '\n');
	});
};
var bodyParser = require('body-parser');

//catches all errors, use this wrapper on all app.get callback func
const asyncHandler = fn =>  
    (req, res, next) =>  {
        Promise.resolve(fn(req, res, next)).catch(function(error){   
			console.log(error);
            next();
        });
    };  
	
//Define app
let app = express();
//app.use(express.static("/home/ec2-user/ReactWebsite/"));
app.use("/me", function(req, res, next) {
	console.log(req.url);
	next();
});
app.use("/me", express.static("/home/ec2-user/ReactWebsite/me/build"));
app.use("/images", express.static("/home/ec2-user/ReactWebsite/me/build/images"));
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../index.html'));
});

app.response.savedSend = app.response.send;
app.response.send = function(data){
	console.log("RESPONSE "+ data);	
	return this.savedSend(data);
};

app.use(bodyParser.urlencoded({
	 extended: true 
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
	if(isEmptyObject(req.body))
		console.log(req.method +" "+ req.url);
	else
		console.log(req.method +" "+ req.url, req.body);
	next();
});

//Test Request Endpoint
app.get('/test.php', asyncHandler(async function(req, res) {
	res.type("json");
	res.send(`{"live":"success"}`);
	res.end();
	return;
}));
var portNumber = 3000;
let server = app.listen(portNumber, function() {  
	console.log("Server is listening on port " + portNumber);
});
