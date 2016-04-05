module.exports = function(app, exp) {

	app.configure(function(){
		app.set('views', app.root + '/app/server/views');
		app.set('view engine', 'jade');
		app.set('view options', { doctype: 'html', pretty: true });
		app.use(exp.logger('dev'));
  		app.use(exp.bodyParser());
		app.use(exp.methodOverride());

		app.use(exp.static(app.root + '/app/server'));
		app.use(require('stylus').middleware({
	        src: app.root + '/app/public',
	        compress: true
	    }));
		app.use(exp.static(app.root + '/app/public'));

		app.use(function(err, req, res, next){
		  // if an error occurs Connect will pass it down
		  // through these "error-handling" middleware
		  // allowing you to respond however you like
		  res.send(500, { error: 'A vague server error has occurred: ' + err + '. Bad connection, perhaps?'});
		})
	});

	app.configure('development', function(){
		app.use(exp.errorHandler());
	});

}