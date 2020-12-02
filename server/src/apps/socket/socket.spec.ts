const io = require('socket.io-client');
import { expect } from 'chai';
import 'mocha';
const socketIO = require('socket.io')

//import { CareerFairSocketProtocol } from './careerFairSocketProtocol';

describe('Socket', function() {

    var clientSocket: any;
    const ioServer = socketIO.listen(3002, {
        options: "*:*"
    });
    
    
    ioServer.on('connection', 
            socket =>
            {
                // Handle connection
                console.log("Server: connected.");

                // Register disconnection event
                socket.on('disconnect', () => console.log("Server: disconnected."));
                
                // Register echo event
                socket.on("echo", (message) =>
                {
                    console.log("Client sent: " + message);
                    socket.emit("echo", message);
                    console.log("Sent");
                });

                //ioServer.sockets.emit("echo", "t");
            }
        );
    
    beforeEach((done) =>  
    {
        // Setup Client
        clientSocket = io.connect('http://localhost:3002/', {
            'reconnection delay' : 0
            , 'reopen delay' : 0
            , 'force new connection' : true
            , transports: ['websocket']
        });

        clientSocket.on('connect', () => {
            console.log("connected.");
            done();
        });

        clientSocket.on('disconnect', () => {
            console.log('disconnected...');
        });
    });

    afterEach((done) => 
    {
        // Cleanup
        if(clientSocket.connected) {
            clientSocket.disconnect();
            done();
        }
        //ioServer.close();
    });
/*
    it('Basic communcation', (done) => 
    {
        // once connected, emit Hello World
        ioServer.emit('echo', 'Hello World');

        // .once -> gets notification of only the next occurence of an event - not future ones
        clientSocket.once('echo', (message) => {
            // Check that the message matches
            expect(message).to.equal('Hello World');
            done();
        });

        ioServer.on('connection', (socket: any) => {
            expect(socket).to.not.be.null;
        });
    });
*/
    it('Career Fair Protocol', () =>
    {
        const testMessage = "Hello World";
        clientSocket.on("echo", (message) => {
            expect.fail();
          });
        clientSocket.emit("echo", testMessage)
        this.timeout(1000);

    });

});