/***
	socketClient.ino: Socket.IO Client for Arduino

        Modified by Sarah Grant for The Barbarian Group to work with Arduino Yun.

	Copyright (C) 2013 Bill Roy
	MIT license: see LICENSE file.

	This sketch listens for a Bitlash command from a socket.io server and
	executes the command, returning its output to the server over the websocket.
	
	For testing, you will find a companion socket.io server in the file 
	index.js in the same directory.

	Run the server ("node index.js"), then boot up the Arduino with this sketch on it.	
	Commands you type on the server console will be executed on the Arduino, 
	and the resulting Bitlash output will be displayed on the server console.

	You will need to adjust the hostname and port below to match your network.
	By default the server runs on port 3000.

***/
#include <Bridge.h>
#include "SocketIOClient.h"
#include "SPI.h"
SocketIOClient client;
boolean has_started = false;
int led = 13;

char hostname[] = "192.168.14.231"; //"23.239.9.102";
int port = 3000;

// websocket message handler: do something with command from server
void onData(SocketIOClient client, char *data) {
 // Serial.print("onData: ");
  //Serial.println(data);
}

void setup() {
  Bridge.begin();     // this launches /usr/bin/run-bridge on Linino
  Serial.begin(115200);

  client.setDataArrivedDelegate(onData);
  if (!client.connect(hostname, port)) Serial.println(F("Not connected."));
  
  //client.send("ready");
  //client.send("start");
}

// set a delay interval so we aren't overwhelmed
//#define LOOP_INT 3000UL
//unsigned long elapsed;

void loop() {
  
  //Serial.println("loop!");
// look out for incoming data over the socket
  //client.monitor();
  
  digitalWrite(led, HIGH);
  delay(1000);
  digitalWrite(led, LOW);
  delay(1000);

//  unsigned long now = millis();
//  if ((now - elapsed) >= LOOP_INT) {
//    elapsed = now;
//    if (!has_started) {
//      if (client.connected()) {
//        Serial.println("send 'start' flag to server");
//        has_started = true;
//        client.send("start");
//      }
//    }
//  }
  
  //delay(1000);
}
