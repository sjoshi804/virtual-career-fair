import { ISocketProtocol } from "./iSocketProtocol";

abstract class AbstractSocketProtocol implements ISocketProtocol
{
    // Member variables
    protected protocolName: string;

    protected namespace: any;

    public onConnection(socket: any) 
    {
        console.log(`${this.protocolName}: ${socket.id} connected.`);
    }

    public onDisconnection(socket: any) 
    {
        console.log(`${this.protocolName}: ${socket.id} disconnected.`);
    }

    public echo(socket, message)
    {
        socket.emit("echo", message);
    }

    abstract registerEventListeners(namespace: any);
}

export { AbstractSocketProtocol }