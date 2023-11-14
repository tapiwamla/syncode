//import IO Server()
const { Server } = require('socket.io');
var io = null;

//creats a new socket.io Server that can be shared/used in all server files
exports.io = function () {
    return io;
  };
  
  exports.io.initialize = function(server) {
    return  io = new Server(server);
  };