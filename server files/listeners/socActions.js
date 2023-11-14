//import module with io server events
const {socEvents}= require("./socketEvents");

//this function loads all the event listeners to IO from socketEvents
module.exports.loadListener = function loadListener(io){
    io.on('connection', (socket)=> {
        socEvents.start(socket, io);
    });
    return io;
}
