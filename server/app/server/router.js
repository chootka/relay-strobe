module.exports = function(app) {

	/*
	 * GET home page.
	 */

	app.get('/', function(req, res){
		res.render( 'arduino' );
	});	

	app.get('/web', function(req, res){
		res.render( 'home' );
	});	
};