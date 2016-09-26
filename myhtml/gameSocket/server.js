var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server,
wss = new WebSocketServer({ port: 8181 });
// var uuid = require('node-uuid');
var clients = [];


wss.on('connection', function(ws) {
    console.log("a guest has connected");
    ws.on('message',function(message){
        console.log("message received");
        console.log(message);
        ws.send("secret")

    });
});