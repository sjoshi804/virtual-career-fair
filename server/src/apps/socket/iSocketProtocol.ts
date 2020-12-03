interface ISocketProtocol
{
    onConnection(socket: any, token: string);
    onDisconnection(socket: any);
    registerEventListeners(namespace: any);
}

export { ISocketProtocol }