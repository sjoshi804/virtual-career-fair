import { CareerFair } from "../careerFair/careerFair";
import { AbstractSocketProtocol } from "./abstractSocketProtocol";

/*
    HOW TO USE:
    - const careerFairSocketProtocol = CareerFairSocketProtocol.getOrCreate();
    - careerFairSocketProtocol.registerEventListeners(io.of('namespace_name'))
    TODO: ROBUSTIFY THIS
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
                if (socket.handshake.query['username'] != undefined)
                {
                    // Handle connection
                    this.onConnection(socket);

                    // Register disconnection event
                    socket.on('disconnect', () =>
                    {
                        this.onDisconnection(socket);
                    });

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
                        this.joinQueue(socket, data.careerFair, data.company);
                    });

                    // Register leaveQueue method
                    socket.on("leaveQueue", (data) =>
                    {
                        this.leaveQueue(socket, data.careerFair, data.company);
                    });

                    // Register startNextMeeting method
                    socket.on("startNextMeeting", (data) => 
                    {   
                        this.startNextMeeting(socket, data.careerFair, data.company, data.signalData);
                    });
                    
                    // Cancel meeting
                    socket.on("cancelMeeting", (data) =>
                    {
                        this.cancelMeeting(socket, data.applicant)
                    });

                    // Accept Meeting Call
                    socket.on("acceptMeetingCall", (data) =>
                    {
                        this.acceptMeetingCall(data.recruiter, data.signal)
                    });
                }
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

    private async joinQueue(socket: any, careerFair: string, company: string)
    {
        const currentFair = await CareerFair.getLiveCareerFair(careerFair);
        if (!currentFair.booths[company].queue.joinQueue(socket.handshake.query['username']))
        {
            socket.emit("error", "Error joining queue.")
        }
        else
        {
            this.updateQueue(careerFair, company, currentFair.booths[company].queue.getLength());
        }
    }

    private async leaveQueue(socket: any, careerFair: string, company: string)
    {
        const currentFair = await CareerFair.getLiveCareerFair(careerFair);
        if (!currentFair.booths[company].queue.leaveQueue(socket.handshake.query['username']))
        {
            socket.emit("error", "Error leaving queue.")
        }
        else
        {
            this.updateQueue(careerFair, company, currentFair.booths[company].queue.getLength());
        }
        
    }

    private async startNextMeeting(socket: any, careerFair: string, company: string, signalData: any)
    {
        // Get career fair
        const currentFair = await CareerFair.getLiveCareerFair(careerFair);

        // Dequeue next applicant
        const nextApplicant = currentFair.booths[company].queue.dequeue();

        // If this applicant is not connected, log error and give up, let client side retry
        if (!this.connectedClients.has(nextApplicant))
        {
            socket.emit("error", "Applicant not logged in.");
            //TODO: More robust solution to this, currently applicant is dropped from queue if not logged in when it is their turn
        }
        // Else, return confirmation to caller i.e. recruiter - starts timeout on recruiter client side to end call if applicant doesn't pick up for too long
        else
        {
            // Confirmation of meeting creation, with username of applicant to call
            socket.emit("outgoingMeetingCall", 
            {
                applicant: nextApplicant
            })

            // Call applicant
            this.namespace.to(this.connectedClients[nextApplicant]).emit("incomingMeetingCall", 
            {
                signal: signalData,
                company: company
            });
        }
    }

    private cancelMeeting(socket, applicant)
    {
        // Cancel call to applicant
        if (!this.connectedClients.has(applicant))
        {
            socket.emit("error", "Applicant no longer logged in.");
        }
        else
        {
            this.namespace.to(this.connectedClients[applicant]).emit("cancelCall");
        }
    }

    private acceptMeetingCall(recruiter: string, signal: any) 
    {
        this.namespace.to(recruiter).emit("acceptMeetingCall", 
        {
            signal: signal
        });
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