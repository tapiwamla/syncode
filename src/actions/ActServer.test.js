import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuidV4 } from 'uuid';
import ioc from 'socket.io-client';
import { getAllConnectedClients } from '/root/syncode/src/server.test.js';
const ACTIONS = require('../actions/Actions');
const PORT = process.env.PORT || 5000;
const socketUrl = 'http://localhost:5000';

describe('Server.js Tests', () => {
    jest.setTimeout(8000);

    let io, serverSocket, clientSocket, client2;
    const userSocketMap = {};
    const rid = uuidV4();

    beforeAll((done) => {
        const httpServer = http.createServer();
        io = new Server(httpServer);

        httpServer.listen(PORT, () => {
            client2 = ioc.connect(socketUrl, {
                'force new connection': true,
                reconnectionAttempt: 'Infinity',
                timeout: 10000,
                transports: ['websocket']
            });

            io.on('connection', (socket) => {
                serverSocket = socket;
            });

            client2.on('connect', done);
        });
    });

    afterAll(() => {
        io.close();
    });

    test('Server adding client', (done) => {
        serverSocket.on(ACTIONS.JOIN, ({ roomId, username }) => {
            userSocketMap[serverSocket.id] = username;
            serverSocket.join(roomId);

            const clients = getAllConnectedClients(roomId);

            if (Array.isArray(clients)) {
                clients.forEach(({ socketId }) => {
                    io.to(socketId).emit(ACTIONS.JOINED, {
                        clients,
                        username,
                        socketId: serverSocket.id,
                    });
                });
            } else {
                console.log('Clients data is not an array:', clients);
            }
        });

        client2.emit(ACTIONS.JOIN, {
            rid,
            username: "user1",
        });

        client2.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
            const userJoin = userSocketMap[socketId];
            expect(userJoin).toBe("user1");
            done();
        });
    });

    test('Can delete user', (done) => {
        serverSocket.on(ACTIONS.LEAVE_ROOM, ({ roomId, username }) => {
            const leavingSocketId = Object.keys(userSocketMap).find(key => userSocketMap[key] === username);

            if (leavingSocketId) {
                io.to(roomId).emit(ACTIONS.DISCONNECTED, {
                    socketId: leavingSocketId,
                    username: userSocketMap[leavingSocketId],
                });

                delete userSocketMap[leavingSocketId];
            }
        });

        client2.emit(ACTIONS.LEAVE_ROOM, {
            rid,
            username: "user1"
        });

        client2.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
            const userLeft = userSocketMap[socketId];
            expect(userLeft).toBeUndefined();
            done();
        });
    });
});
