var restify = require('restify');
var config = require('./config')

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}


var server = restify.createServer({
	name: 'CIET',
	version: '1.0.0'
});

server.use(restify.fullResponse());
server.use(restify.bodyParser());
server.use(restify.queryParser());


server.listen(config.serverPort, function() {
  console.log('%s listening at %s', server.name, server.url);
});

var routes = require('./Route/routes')(server,restify);