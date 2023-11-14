const  {io} = require("./io");
const {loadListener} = require("../listeners/socActions");

//create the io server and pass it to loadListener 
module.exports =   async function  ({server}){
    var socketEmitter = await io.initialize(server);
    loadListener(socketEmitter);
    return [server,socketEmitter];
}