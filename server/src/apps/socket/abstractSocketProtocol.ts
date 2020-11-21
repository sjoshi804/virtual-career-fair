import { ISocketProtocol } from "./iSocketProtocol";

abstract class AbstractSocketProtocol implements ISocketProtocol
{
    // Member variables
    // For logging purposes
    protected protocolName: string;

    // Namespace object from socket.io
    protected namespace: any;

    // Map from username -> socket.id
    protected connectedClients: Map<string, string>;


    constructor()
    {
        // Initialize map of connected clients: username -> socket.id
        this.connectedClients = new Map<string, string>();
    }

    // onConnection adds username, socket.id to connected clients 
    // if duplicate for username, replaces old one - TODO: Think about this more
    public onConnection(socket: any) 
    {
        if (!this.connectedClients.has(socket.handshake.query['username']))
        {
            this.connectedClients.set(socket.handshake.query['username'], socket.id);
            console.log(`${this.protocolName}: ${socket.id} connected.`);
        }
        else if (socket.id != this.connectedClients.has(socket.handshake.query['username']))
        {
            this.connectedClients.set(socket.handshake.query['username'], socket.id);
            console.log(`${this.protocolName}: ${socket.handshake.query['username']} was already connected. Replacing socket.id with new socket.id`);
        }
    }

    // On disconnection removes username, socket.id from the map, if never existed logs possible error
    public onDisconnection(socket: any) 
    {
        if (!this.connectedClients.has(socket.handshake.query['username']))
        {
            console.log(`${this.protocolName}: ${socket.handshake.query['username']} was never connected, but attempted to disconnect. Possible error.`);
        }
        else
        {
            this.connectedClients.delete(socket.handshake.query['username']);
            console.log(`${this.protocolName}: ${socket.handshake.query['username']} disconnected.`);
        }
    }

    // Echo event to help with testing / debugging
    public echo(socket, message)
    {
        socket.emit("echo", message);
    }

    abstract registerEventListeners(namespace: any);
}

export { AbstractSocketProtocol }