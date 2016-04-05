//#include "Arduino.h"
#include <SPI.h>
#include <WebSocketClient.h>
//#include <Process.h>
#include <Bridge.h>
//#include <YunClient.h>

char messageBuffer[12], cmd[3], pin[3], val[4], aux[4];
boolean debug = false;
int index = 0;
int _init = 0;

char server[] = "23.239.9.102"; // echo.websocket.org 23.239.9.102
int port = 3000;
char path[] = "/socket.io/1"; //";
WebSocketClient client;

void setup() {
  Bridge.begin();     // this launches /usr/bin/run-bridge on Linino
  Serial.begin(57600);
  
  bool _connect = client.connect(server, port, path);
  Serial.println(_connect);
  client.setDataArrivedDelegate(dataArrived);
  Serial.println("setup");
}

void loop() {
  
//  pinMode(13, OUTPUT);
//  digitalWrite(13, HIGH);
//  delay(200);
//  digitalWrite(13, LOW);
//  delay(790);
  
 /**
  * Waiting for commands
  */
  client.monitor();
}

void dataArrived(WebSocketClient client, String data) {
  Serial.println("Data Arrived: " + data);
}

/**
 * Deal with a full message and determine function to call
 */
void process() {
  //Serial.println("process");
//  index = 0;
//  
//  strncpy(cmd, messageBuffer, 2);
//  cmd[2] = '\0';
//  strncpy(pin, messageBuffer + 2, 2);
//  pin[2] = '\0';
//  strncpy(val, messageBuffer + 4, 3);
//  val[3] = '\0';
//  strncpy(aux, messageBuffer + 7, 3);
//  aux[3] = '\0';
  
  if (debug) {
    Serial.println(messageBuffer); }
  
  //dw(pin,val);
}

/**
 * Digital write
 * @param char pin identifier for pin
 * @param char val set pin to HIGH or LOW
 */
void dw(char *pin, char *val) {
  if (debug) {
    Serial.println("dw"); }
    
  int p = getPin(pin);
  if (p == -1 && debug) {
    Serial.println("badpin");
  } else {  
    pinMode(p, OUTPUT);
    if (atoi(val) == 0) {
      digitalWrite(p, LOW);
    } else {
      digitalWrite(p, HIGH);
    }
  }
}

int getPin(char *pin) { //Converts to A0-A5, and returns -1 on error
  int ret = -1;
  if (pin[0] == 'A' || pin[0] == 'a') {
    switch(pin[1]) {
      case '0': ret = A0; break;
      case '1': ret = A1; break;
      case '2': ret = A2; break;
      case '3': ret = A3; break;
      case '4': ret = A4; break;
      case '5': ret = A5; break;
      default:            break;
    }
  } else {
    ret = atoi(pin);
    if (ret == 0 && (pin[0] != '0' || pin[1] != '0')) {
      ret = -1; }
  }
  
  return ret;
}
