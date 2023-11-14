const express = require('express');
const app = express();
const http = require('http');


const ACTIONS = require('./src/actions/Actions');

const loader = require('./server files/loader/socketLoader');


let io = null;
// port listen
const PORT = process.env.PORT || 5000;

async function startServer() {
    //create http server
    let server = http.createServer(app);
    //load the events to io
    [server,io] = await loader({server});
    server.listen(PORT, () =>
        console.log(`Listening on port ${PORT}`)
    );
}
function close(){
    if(io!==null){
        io.close();
    }
}
startServer();
module.exports = startServer;
module.exports.close = close;