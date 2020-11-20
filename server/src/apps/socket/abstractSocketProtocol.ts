import { ISocketProtocol } from "./iSocketProtocol";

abstract class AbstractSocketProtocol implements ISocketProtocol
{
    // Member variables
    protected protocolName: string;

    protected namespace: any;

    protected connectedClients: Array<string>;

    private initConnectedClients()
    {
        if (this.connectedClients == undefined)
        {
            this.connectedClients = new Array<string>();
        }
    }

    public onConnection(socket: any) 
    {
        this.initConnectedClients();
        if (this.connectedClients.indexOf(socket.id) == -1)
        {
            console.log(`${this.protocolName}: ${socket.id} connected.`);
        }
        else
        {
            console.log(`${this.protocolName}: ${socket.id} already connected.`);
        }
    }

    public onDisconnection(socket: any) 
    {
        this.initConnectedClients();
        if (this.connectedClients.indexOf(socket.id) == -1)
        {
            console.log(`${this.protocolName}: ${socket.id} was never connected, but attempted to disconnect. Possible error.`);
        }
        else
        {
            console.log(`${this.protocolName}: ${socket.id} disconnected.`);
        }
    }

    public echo(socket, message)
    {
        socket.emit("echo", message);
    }

    abstract registerEventListeners(namespace: any);
}

export { AbstractSocketProtocol }