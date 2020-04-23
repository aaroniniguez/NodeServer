const express = require('express'); 
const path = require('path');
var dotenv = require('dotenv').config({path: __dirname + '/.env'});
var https = require('https');
var http = require('http');
var fs = require("fs");
const {
	logger,
	asyncHandler
} =  require("./utils.js")
//keep a reference displaying to console rather than defaulting to serverLog.txt
let savedConsole = console.log
console.log = logger;
var bodyParser = require('body-parser');
const innovationRoutes = require("./routes/innovation")
let app = express();
if(process.env.ENVIRONMENT != "DEVELOPMENT") {
	app.all('*', (req, res, next) => {
		if(req.protocol === 'https')
			next();
		else
			return res.redirect("https://" + req.hostname + req.originalUrl);
	});
}

app.response.savedSend = app.response.send;
app.response.send = function(data) {
	console.log("RESPONSE "+ data);	
	return this.savedSend(data);
};

app.use(bodyParser.urlencoded({
	 extended: true 
}));
app.use(bodyParser.json());

//serve UI 
app.use(express.static(__dirname+"/../public"));
app.use("/api/innovation", innovationRoutes);
app.get('/rest/test.php', asyncHandler(async function(req, res) {
	return res.cookie('testing','test').send(`{"live":"success"}`);
}));
app.get("/*", function(req, res) {
	res.sendFile(path.join(__dirname, '/../public/index.html'));
});
if(process.env.ENVIRONMENT != "DEVELOPMENT") {
	// Certificate
	const privateKey = fs.readFileSync('/etc/letsencrypt/live/boardgamecards.com/privkey.pem', 'utf8');
	const certificate = fs.readFileSync('/etc/letsencrypt/live/boardgamecards.com/cert.pem', 'utf8');
	const ca = fs.readFileSync('/etc/letsencrypt/live/boardgamecards.com/fullchain.pem', 'utf8');
	const credentials = {
		key: privateKey,
		cert: certificate,
		ca: ca
	};
	https.createServer(credentials, app).listen(443);
	http.createServer(app).listen(80);
	savedConsole(`listening on https://localhost/rest/test.php`)
} else {
	http.createServer(app).listen(process.env.SERVER_PORT);
	savedConsole(`listening on http://localhost:${process.env.SERVER_PORT}/rest/test.php`)
}