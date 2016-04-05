;(function($, io, Raphael) {

	var seq = {
		'cfg': {
			'socket': null,
			'r': null,
    		'circ': null,
    		'circ2': null,
    		'circ3': null,
    		'circ4': null
		},
		'evt': {
			'ready': function() {
				seq.fn.init();
			}
		},
		'fn': {
			'init': function() {
				// $('#sequencer-buttonStop').click(function(e) {
			 //      e.preventDefault();
			 //      seq.fn.sequencerStop();
			 //    });
			    
			 //    $('#sequencer-buttonStart').click(function(e) {
			 //      e.preventDefault();
			      
			 //      seq.fn.sequencerStart();

			 //    });

				seq.cfg.socket = io.connect('192.168.14.231:3000');
				seq.cfg.socket.on( 'ready', seq.fn.ready );
				seq.cfg.socket.on( 'connect', seq.fn.connected );
				seq.cfg.socket.on( 'disconnect', seq.fn.disconnected );
				seq.cfg.socket.on( 'strobe', seq.fn.strobe );

				seq.cfg.socket.emit('ready');

				//seq.fn.sequencerStart();			
			},
			'ready': function( data ) {
				//console.log("ready, " + data.response);
				$('.messages').html(data.response);
			},
			'connected': function( data ) {
				//if (data) console.log("connected, " + data.response);

				seq.cfg.socket.emit('ready');

				seq.fn.sequencerStart();	
			},
			'disconnected': function( data ) {
				//console.log("disconnected, " + data.response);
			},
			'sequencerStart': function() {
			    //console.log("sequencerStart; draw pulsing dots and start interval");

			    // seq.cfg.r = Raphael("holder", 800, 600);
			    // seq.cfg.circ = seq.cfg.r.circle(150, 100, 1).attr({fill: "#000", stroke: "#fff", "stroke-dasharray": "- ", opacity: .85});
			    // seq.cfg.circ2 = seq.cfg.r.circle(300, 100, 1).attr({fill: "#000", stroke: "#fff", "stroke-dasharray": "- ", opacity: .85});
			    // seq.cfg.circ3 = seq.cfg.r.circle(450, 100, 1).attr({fill: "#000", stroke: "#fff", "stroke-dasharray": "- ", opacity: .85});
			    // seq.cfg.circ4 = seq.cfg.r.circle(600, 100, 1).attr({fill: "#000", stroke: "#fff", "stroke-dasharray": "- ", opacity: .85});

			    // do sequencer logic here
			    seq.cfg.socket.emit('start');
			},
			'sequencerStop': function() {
			    //console.log("sequencerStop");
				seq.cfg.socket.emit('stop');
			},
			'strobe': function() {
			    //console.log("strobe");
				// seq.fn.updateValue(32, '#fff', 1);
				// setTimeout(function(){
				// 	seq.fn.updateValue(30, '#0D17A1', .5);
				// }, 70);

				// should be, if data.response == 'on', seq.fn.updateValue(32, '#fff', 1);
				// if data.response == 'off', seq.fn.updateValue(30, '#0D17A1', .5);
			},
			'updateValue': function(val, val2, val3) {
			    // seq.cfg.circ.animate({r: val, "stroke-width": val / 100, fill: "#000", "fill-opacity": +!!(val - 100)}, 1000, "elastic");
			    // seq.cfg.circ2.animate({r: val, "stroke-width": val / 100, fill: "#000", "fill-opacity": +!!(val - 100)}, 1000, "elastic");
			    // seq.cfg.circ3.animate({r: val, "stroke-width": val / 100, fill: "#000", "fill-opacity": +!!(val - 100)}, 1000, "elastic");
			    // seq.cfg.circ4.animate({r: val, "stroke-width": val / 100, fill: "#000", "fill-opacity": +!!(val - 100)}, 1000, "elastic");
    		}
		}
	};

	seq.evt.ready();
	
}(jQuery, io, Raphael));