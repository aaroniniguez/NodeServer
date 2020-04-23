const {
	isEmptyObject,
} =  require("../utils.js")

module.exports.requestLogger  = function(req, res, next) {
	res.type("json");
	if(isEmptyObject(req.body))
		console.log(req.method +" "+ req.url);
	else
		console.log(req.method +" "+ req.url, req.body);
	next();
};

module.exports.setResponseHeaders = function(req, res, next) {
    let allowedOrigins = [
        `http://${process.env.HOST}`,
        `https://${process.env.HOST}`,
    ];
    let origin = req.headers.origin;
    if(allowedOrigins.includes(origin)){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
	res.header("Access-Control-Allow-Credentials", true)
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	next();
}