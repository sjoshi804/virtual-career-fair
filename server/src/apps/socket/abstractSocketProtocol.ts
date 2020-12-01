import { User } from "../user/user";
import { ISocketProtocol } from "./iSocketProtocol";

abstract class AbstractSocketProtocol implements ISocketProtocol
{
    // Member variables
    // For logging purposes
    protected protocolName: string;

    // Namespace object from socket.io
    protected namespace: any;

    // Map from username -> socket.id
    private connectedClients: Map<string, string>;


    constructor()
    {
        // Initialize map of connected clients: username -> socket.id
        this.connectedClients = new Map<string, string>();
    }

    // onConnection adds username, socket.id to connected clients 
    // if duplicate for username, replaces old one FIXME:
    public onConnection(socket: any, token: string) 
    {
        var username = User.getDataFromToken(token);
        console.log(username);
        if (!this.connectedClients.has(username))
        {
            this.connectedClients.set(username, socket.id);
            console.log(`${this.protocolName}: ${socket.id} connected.`);
        }
        else if (socket.id != this.connectedClients.has(username))
        {
            this.connectedClients.set(username, socket.id);
            console.log(`${this.protocolName}: ${username} was already connected. Replacing socket.id with new socket.id`);
        }
        console.log(this.connectedClients);
    }

    // On disconnection removes username, socket.id from the map, if never existed logs possible error FIXME:
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
        console.log(this.connectedClients);
    }

    // Echo event to help with testing / debugging
    public echo(socket, message)
    {
        socket.emit("echo", message);
    }

    abstract registerEventListeners(namespace: any);
}

export { AbstractSocketProtocol }