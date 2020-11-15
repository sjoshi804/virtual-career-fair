interface ISocketProtocol
{
    onConnection(socket);
    onDisconnection(socket);
    registerEventListeners(namespace: any);
}

export { ISocketProtocol }