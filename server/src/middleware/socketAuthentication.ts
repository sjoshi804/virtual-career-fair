const moment = require('moment');

const socketAuthentication = (socket: any, next: any) =>
{
    console.log(
        `${moment().format('YYYY-MM-DD HH:mm:ss')}: SOCKET - connection attempt by ${socket.id}`
    );

    // Do some authentication

    // Hand off control to socket event listeners
    next();
};

export { socketAuthentication }