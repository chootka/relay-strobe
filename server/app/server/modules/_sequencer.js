module.exports = function(io) {

	var connections = {};
	var strobeInt;
	var isStrobing = false;

	io
		.on('connection', function( socket ) {

			console.log("++++++++++++++++++++++CLIENT CONNECTED TO SERVER++++++++++++++++++++++");
			socket.send("hi from server");

			// record client connection to connections obj
			connections[socket.id] = {};
			broadcastMessage('connect', { response : socket.id + ' connected.' });

			socket.on('disconnect', function() {
				delete connections[socket.id];
				broadcastMessage('disconnect', { response : socket.id + ' disconnected.' });
			});

			socket.on('ready', function( data ) {
				//console.log(socket.id + " is ready!");
				broadcastMessage( 'ready', { response: socket.id + ' is ready.' });
				socket.send(data);
			});

			socket.on('start', function() {
				//console.log(socket.id + " said: START!");
				if (!isStrobing) {
					isStrobing = true;		
					strobeInt = setInterval(function() {
						broadcastMessage( 'strobe', { response: 'on' });
						setTimeout(function() {
							broadcastMessage( 'strobe', { response: 'off' });
						}, 70);
					}, 1000);
				}
			});

			socket.on('stop', function() {
				clearInterval(strobeInt);
				isStrobing = false;		
			});

			function broadcastMessage( message, data ) {
				data.connections = connections;
				// remove socket.emit if you don't want the sender to receive their own message
				socket.emit( message, data );
				socket.broadcast.emit( message, data );
			}

		});
};