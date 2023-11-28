const express = require("express");
const app = express();
const http = require('http');
const {Server}= require('socket.io');
const ioc = require("socket.io-client");
import { v4 as uuidV4 } from 'uuid';

const ACTIONS = require('../../actions/Actions');
const PORT = process.env.PORT || 5000;
const socketUrl = 'http://localhost:5000';
const {socEvents} = require('./socketEvents');


describe('Event test', ()=>{
    jest.setTimeout(9000);
     
    let io, httpServer, users, client1, client2;
    let client1SID, client2SID;
    var result
    let rid ;
    let rid2 ;
    
    beforeAll((done)=>{
        //start HTTP server and socket
        httpServer = http.createServer(app);
        io = new Server(httpServer);
        httpServer.listen(PORT,  () =>{
            const port = httpServer.address().port;
             io.on('connection', (socket) => {
                //use socketEventa
                socEvents.start(socket, io);
                users = socEvents.userSocMap();                
              });
              done();                       
        });   
    });    
    afterAll(()=>{
        //close servers
        io.close();
        httpServer.close();        
    });

    beforeEach((done) =>{
        rid = uuidV4();
        rid2 = uuidV4();
        //initialize clients before each test             
        client1 = makeSocket(socketUrl);
        client2 = makeSocket(socketUrl);                 
        client1.on('connect',done);      
    });
    // disconnect users;
    afterEach(()=>{        
        client1.disconnect();
        client2.disconnect();
        users = null;
    });
    //function to initialize client sockets
    const makeSocket = (url) => {
        const socket = ioc.connect(url, {
          'force new connection': true,
          reconnectionAttempt: 'Infinity',
          timeout: 10000,
          transports: ["websocket"],
        });
        return socket;
      };

    it("Socket Server adds client info using socketEvents.js", (done)=>{
        //client1 joins with their information
        client1.emit(ACTIONS.JOIN, {
            rid,
            username: "User1",
        });
        //server returns info is user was added
        client1.on(ACTIONS.JOINED, ( {clients, username, socketId} )=>{
            result = username;
            client1SID = socketId;
            expect(users[client1SID]).toBe("User1");
            done();
        });   
    });
    it("userSocketMap from socketEvents.js is accessible and reflects Events", (done)=>{
        //use client1's socketId to get the value
        //users was initialized as socEvents.userSocketMap
        //client1 joins with their information
        client1.emit(ACTIONS.JOIN, {
            rid,
            username: "User1",
        });
        //server returns info is user was added
        client1.on(ACTIONS.JOINED, ( {clients, username, socketId} )=>{
            result = username; 
            client1SID = socketId;
            expect(users[client1SID]).toBe(result);
           
        });          
        
        client2.on('connect',()=>{
            console.log("User2 connected");
        });

        //create client2 to check contents of users        
        client2.emit(ACTIONS.JOIN, {
            rid,
            username: "User2",
        });        
        client2.on(ACTIONS.JOINED, ( {clients, username, socketId} )=>{
            result = username;
            client2SID = socketId;            
            expect(users[client2SID]).toBe("User2");       
        }); 
  
        //is client1's info available in users after they leave
         client1.emit(ACTIONS.LEAVE_ROOM, ({
            rid,
            username: "User1",
        })
        );                  
        client1.off(ACTIONS.JOINED);
        
        client2.emit("message", "delete test");
        client2.on("message", msg => {
            expect(users[client1SID]).toBeInvalid;
            expect(users[client2SID]).toBe("User2");             
            done();

        });
        
    });
});