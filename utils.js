const fs = require("fs");
var util = require('util');
let log_file = fs.createWriteStream(__dirname + '/serverLog.txt', {flags : 'a'});
module.exports.logger = function (...args) {
	var myTime = new Date();
	myTime = myTime.toString().split("GMT")[0];
	log_file.write("\n====" + myTime + "====\n");
	args.forEach(function(element){
	   log_file.write(util.format(element) + '\n');
	});
};

module.exports.isEmptyObject = function(obj) {
	return !Object.keys(obj).length;
}

//catches all errors, use this wrapper on all app.get callback func
module.exports.asyncHandler = fn =>
    (req, res, next) =>  {
        Promise.resolve(fn(req, res, next)).catch(function(error){   
			console.log(error);
			if(error.name == "InvalidInput" || error.name == "InvalidCredentials"){
				res.send(`{"type":"error","message":"${error.message}"}`);
				res.end();
				return;
			}else{
				console.log(error);
			}
            next();
        });
    };  