import { ISocketProtocol } from "./iSocketProtocol";

abstract class AbstractSocketProtocol implements ISocketProtocol
{
    protected connectionPool: Array<string>;

    protected protocolName: string;

    public onConnection(socket: any) 
    {
        console.log(`${this.protocolName}: ${socket.id} connected.`);
        this.connectionPool.push(socket.id);
    }

    public onDisconnection(socket: any) 
    {
        const index = this.connectionPool.indexOf(socket.id);
        if (index != -1)
        {
            console.log(`${this.protocolName}: ${socket.id} disconnected.`);
            this.connectionPool.splice(index, 1);
        }
        else
        {
            console.log(`${this.protocolName}: Attempting to disconnect user that wasn't connected, seems sus.`)
        }
    }

    abstract registerEventListeners(namespace: any);
}

export { AbstractSocketProtocol }