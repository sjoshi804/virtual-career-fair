import { CareerFair } from "../careerFair/careerFair";
import { AbstractSocketProtocol } from "./abstractSocketProtocol";

/*
    HOW TO USE:
    - const careerFairSocketProtocol = CareerFairSocketProtocol.getOrCreate();
    - careerFairSocketProtocol.registerEventListeners(io.of('namespace_name'))
*/

class CareerFairSocketProtocol extends AbstractSocketProtocol
{
    // Implementing singleton pattern
    private static instance = new CareerFairSocketProtocol();

    private constructor()
    {
        super();
    }

    static getOrCreate()
    {
        if (this.instance == undefined)
        {
            this.instance = new CareerFairSocketProtocol();
        }
        return this.instance;
    }

    // Member variables
    protocolName = "CareerFairSocketProtocol";

    // Methods required to implement by ISocketProtocol Interface
    registerEventListeners(namespace: any) 
    {
        this.namespace = namespace;
        this.namespace.on('connection', 
            socket =>
            {
                // Handle connection
                this.onConnection(socket);

                // Register disconnection event
                socket.on('disconnect', this.onDisconnection);

                // Register echo event
                socket.on("echo", (message) =>
                {
                    console.log("Echo test: " + message);
                    this.echo(socket, message);
                });

                // Register join room event - each room corresponds to a live career fair
                socket.on("join", (room) =>
                {
                    this.joinRoom(socket, room);
                });

                // Register joinQueue method
                socket.on("joinQueue", (data) =>
                {
                    this.joinQueue(data.careerFair, data.company);
                });

                // Register leaveQueue method
                socket.on("leaveQueue", (data) =>
                {
                    this.leaveQueue(data.careerFair, data.company);
                });

                // Register startNextMeeting method
                socket.on("startNextMeeting", (data) => 
                {   
                    this.startNextMeeting(socket, data.careerFair, data.company);
                });
            }
        );
    }

    // Private event handlers
    private joinRoom(socket, room: string)
    {
        if (CareerFair.db.count({_id: room }) == 0)
        {
            socket.emit("error", "This career fair doesn't exist.")
        }
        else
        {
            socket.join(room);
        }
    }

    private joinQueue(careerFair: string, company: string)
    {
        TODO: console.log("This needs to actually add to a queue - talk to career fair");
    }

    private leaveQueue(careerFair: string, company: string)
    {
        TODO: console.log("This needs to actually remove from a queue - talk to career fair");
    }

    private startNextMeeting(socket: any, careerFair: string, company: string)
    {
        CareerFair.liveFairs[]
    }

    // Public API to trigger emits

    // Update queue broadcasts to all clients that the queue has been updated for a given company at a given career fair
    public updateQueue(careerFair: string, company: string, numInQueue: number)
    {
        this.namespace.sockets.in(careerFair).broadcast.emit('queueUpdate',
        {
            company: company,
            numInQueue: numInQueue
        })
    }

    // Make annoucement to entire fair
    public announcement(careerFair: string, message: string)
    {
        this.namespace.sockets.in(careerFair).broadcast.emit("announcement",
        {
            message: message
        });
    }

    // Make announcement targetted for one booth i.e. one company at a career fair
    public companyAnnouncement(careerFair: string, company: string, message: string)
    {
        this.namespace.sockets.in(careerFair).broadcast.emit("companyAnnouncement",
        {
            company: company,
            message: message
        });
    }
}

export { CareerFairSocketProtocol }