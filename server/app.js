/**
 * Module dependencies.
 */
var express   = require('express'),
	app         = express(),
  http        = require('http'),
  server      = http.createServer(app),
  io          = require('socket.io').listen(server);

app.root    	= __dirname;

io.configure('production', function(){
  io.enable('browser client etag');
  io.set('log level', 1);

  // io.set('transports', [
  //   'websocket'
  // ]);
});

// io.configure('development', function(){
//   io.set('transports', ['websocket']);
// });

// create the application
require('./app/config')(app, express);
require('./app/server/router')(app);
require('./app/server/modules/_sequencer')(io);

// fire up the server
server.listen(3000, function() {
  console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
});