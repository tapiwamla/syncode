//Listeners for the socket.on events
const ACTIONS = require("../../actions/Actions"); 
const userSocketMap = {};

module.exports.socEvents = {
    start: function(socket, io){
        socket.on("message", msg =>{
            console.log(`recieved ${msg}`);
            socket.emit("message", msg);
        });

        //JOIN event
        socket.on(ACTIONS.JOIN,({roomId, username}) => {
            userSocketMap[ socket.id ] = username;
            socket.join(roomId);

            const clients = getAllConnectedClients(roomId);
            if (Array.isArray(clients)) {
                clients.forEach(({ socketId }) => {
                    io.to(socketId).emit(ACTIONS.JOINED, {
                        clients,
                        username,
                        socketId: socket.id,
                    });
                });
            } else {
                console.log('Clients data is not an array:', clients);
            }
          });
        // event for sync
        socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
            socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
        });

        socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
            io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
        });

        // disconnecting from socket
        socket.on('disconnecting', () => {
            const rooms = [ ...socket.rooms ];
            rooms.forEach((roomId) => {
                socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                    socketId: socket.id,
                    username: userSocketMap[ socket.id ]
                });
            });
            delete userSocketMap[ socket.id ];
            socket.leave();
        });

        socket.on(ACTIONS.LEAVE_ROOM, ({ roomId, username }) => {
            const leavingSocketId = Object.keys(userSocketMap).find(key => userSocketMap[ key ] === username);

            if (leavingSocketId) {
                // Emit a custom event to notify other clients that the user left
                socket.to(roomId).emit(ACTIONS.DISCONNECTED, {
                    socketId: leavingSocketId,
                    username: userSocketMap[ leavingSocketId ],
                });

                // Remove the user from the userSocketMap
                delete userSocketMap[ leavingSocketId ];
            }
        });

        function getAllConnectedClients(roomId) {
            return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
                return {
                    socketId,
                    username: userSocketMap[ socketId ]
                };
            });
        }
    }
}