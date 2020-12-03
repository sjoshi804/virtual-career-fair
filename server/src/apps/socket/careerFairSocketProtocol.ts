import { CareerFair } from "../careerFair/careerFair";
import { Company } from "../company/company";
import { User } from "../user/user";
import { AbstractSocketProtocol } from "./abstractSocketProtocol";

/*
    HOW TO USE:
    - const careerFairSocketProtocol = CareerFairSocketProtocol.getOrCreate();
    - careerFairSocketProtocol.registerEventListeners(io.of('namespace_name'))
    TODO: ROBUSTIFY THIS
*/


class CareerFairSocketUserTable
{
    // First map in tuple is socketId->userId, second is userId->socketId
    private map: Map<string, [Map<string, string>, Map<string, string>]>;

    // Initialize map
    constructor()
    {
        this.map = new Map<string, [Map<string, string>, Map<string, string>]>();
    }

    // Insert
    public insert(careerFair: string, socketId: string, userId: string)
    {
        // If career fair not accessed before, initialize maps for it
        if (!this.map.has(careerFair))
        {
            this.map.set(careerFair, [new Map<string, string>(), new Map<string, string>()]);
        }

        this.map.get(careerFair)[0].set(socketId, userId);
        this.map.get(careerFair)[1].set(userId, socketId);
    }

    // Gets
    public getUserId(careerFair: string, socketId: string)
    {
        try 
        {
            return this.map.get(careerFair)[0].get(socketId);
        }
        catch 
        {
            return null
        }
    }

    public getSocketId(careerFair: string, userId: string)
    {
        try 
        {
        return this.map.get(careerFair)[1].get(userId);
        }
        catch 
        {
            return null
        }
    }

    // Has
    public hasSocketId(socketId: string, careerFair?: string)
    {
        if (careerFair == undefined)
        {
            var has = false;
            for (let [key, value] of this.map)
            {
                has = has || value[0].has(socketId)
                if (has)
                {
                    return true;
                }
            }
            return false;
        }
        else 
        {
            return this.map.get(careerFair)[0].has(socketId)
        }
    }

    public hasUserId(userId: string, careerFair?: string)
    {
        if (careerFair == undefined)
        {
            var has = false;
            for (let [key, value] of this.map)
            {
                has = has || value[1].has(userId)
                if (has)
                {
                    return true;
                }
            }
            return false;
        }
        else 
        {
            return this.map.get(careerFair)[1].has(userId)
        }
    }

    // Deletes
    public deleteBySocketId(socketId: string)
    {
        // Track which fairs to delete
        var careerFairsToDelete = []

        // Delete socket from all career fairs, delete userId id from all
        for (let [key, value] of this.map)
        {
            const userId = value[0].get(socketId);
            value[0].delete(socketId);
            value[1].delete(userId);

            // Mark fair for deletion if no users left
            if (value[0].size == 0)
            {
                careerFairsToDelete.push(key);
            }
        }

        // Delete empty fairs
        for (let key of careerFairsToDelete)
        {
            this.map.delete(key);
        }        
    }
}

class CareerFairSocketProtocol extends AbstractSocketProtocol
{
    // Member Variables
    // Users map from careerFairId ->  BidirectionalMap<socket.id, user.id)
    private users: CareerFairSocketUserTable

    // Implementing singleton pattern
    private static instance = new CareerFairSocketProtocol();

    private constructor()
    {
        super();
        this.users = new CareerFairSocketUserTable();
    }

    static getOrCreate()
    {
        if (this.instance == undefined)
        {
            this.instance = new CareerFairSocketProtocol();
        }
        return this.instance;
    }

    // Protocol Name
    static protocolName = "CareerFairSocketProtocol";

    // Logger function
    static log(methodName, data)
    {
        console.log(`${CareerFairSocketProtocol.protocolName} ${methodName}:\n\t${JSON.stringify(data)}`);
    }   

    // Methods required to implement by ISocketProtocol Interface
    registerEventListeners(namespace: any) 
    {
        this.namespace = namespace;
        this.namespace.on('connection', 
            socket =>
            {
                // Register echo event
                socket.on("echo", (message) =>
                {
                    CareerFairSocketProtocol.log("echo", message);
                    this.echo(socket, message);
                });

                // TODO: Add recruiter / leave recruiter                    

                // Register disconnection event
                socket.on('disconnect', () =>
                {
                    CareerFairSocketProtocol.log("disconnect", "N/A");
                    this.onDisconnection(socket);
                });

                // Register join room event - each room corresponds to a live career fair
                socket.on("join", (data) =>
                {
                    CareerFairSocketProtocol.log("join", data);
                    this.joinRoom(socket, data.careerFair, data.token);
                });

                // Register joinQueue method
                socket.on("joinQueue", (data) =>
                {
                    CareerFairSocketProtocol.log("joinQueue", data);
                    this.joinQueue(socket, data.careerFair, data.company);
                });

                // Register leaveQueue method
                socket.on("leaveQueue", (data) =>
                {
                    CareerFairSocketProtocol.log("leaveQueue", data);
                    this.leaveQueue(socket, data.careerFair, data.company);
                });

                // Register startNextMeeting method
                socket.on("startNextMeeting", (data) => 
                {   
                    CareerFairSocketProtocol.log("startNextMeeting", data);
                    this.startNextMeeting(socket, data.careerFair, data.company);
                });
                
                // Cancel meeting
                socket.on("cancelMeeting", (data) =>
                {
                    CareerFairSocketProtocol.log("cancelMeeting", data);
                    this.cancelMeeting(socket, data.applicant, data.careerFair)
                });

                // Accept Meeting Call
                socket.on("acceptMeetingCall", (data) =>
                {
                    CareerFairSocketProtocol.log("acceptMeetingCall", data);
                    this.acceptMeetingCall(data.careerFair, data.recruiter, data.peerJsId)
                });
            }
        );
    }

    // Connection to room 
    private async joinRoom(socket, careerFair: string, token: string)
    {
        // Get userId from token
        const userId = User.getDataFromToken(token).id;

        // If career fair doesn't exist
        if (CareerFair.db.count({_id: careerFair }) == 0)
        {
            socket.emit("customError", "This career fair doesn't exist.")
        }
        // If token invalid
        else if (userId == null)
        {    
            socket.emit("customError", "Invalid token.");
        }
        else
        {
            // Add to users
            this.users.insert(careerFair, socket.id, userId);

            // Join room
            socket.join(careerFair);

            // Emit
            var booths = new Map<string, Map<string, string>>();
            const currentFair = await CareerFair.getLiveCareerFair(careerFair);
            if (currentFair.booths != undefined)
            {
                for (var key in currentFair.booths) 
                {
                    if (Object.prototype.hasOwnProperty.call(currentFair.booths, key)) 
                    {
                        const booth = currentFair.booths[key];
                        booths[key] = new Map<string, string>();
                        booths[key]["numInQueue"] = booth.queue.getLength();
                        booths[key]["position"] = booth.queue.getPosition(userId);
                    }
                }
            }
            socket.emit("boothData", booths);
        }
    }

    //  Disconnection
    public onDisconnection(socket: any)
    {
        this.users.deleteBySocketId(socket.id);
    }

    // Private Event Handlers
    private async joinQueue(socket: any, careerFair: string, company: string)
    {
        // Get live career fair instance
        const currentFair = await CareerFair.getLiveCareerFair(careerFair);

        // If failed to join queue with user id log customError
        console.log(this.users.getUserId(careerFair, socket.id));
        if (!currentFair.booths[company].queue.joinQueue(this.users.getUserId(careerFair, socket.id)))
        {
            socket.emit("customError", "customError joining queue.")
        }
        // UpdateQueue to notify all of update
        else 
        {
            // Update career fair object
            CareerFair.updateLiveCareerFair(careerFair, currentFair);

            // Inform sender of position
            socket.emit("updatePosition", 
            {
                company: company,
                position: currentFair.booths[company].queue.getLength() - 1
            })
            // Send update queue to everyone
            this.updateQueue(careerFair, company, currentFair.booths[company].queue.getLength());
        }
    }

    private async leaveQueue(socket: any, careerFair: string, company: string)
    {
        // Get live career fair instance 
        const currentFair = await CareerFair.getLiveCareerFair(careerFair);

        // If failed to leave queue, send customError 
        if (!currentFair.booths[company].queue.leaveQueue(this.users.getUserId(careerFair, socket.id)))
        {
            socket.emit("customError", "customError leaving queue.")
        }
        // UpdateQueue to notify all of update
        else
        {
            // Update career fair object
            CareerFair.updateLiveCareerFair(careerFair, currentFair);
            
            // Inform sender of position
            socket.emit("updatePosition", 
            {
                company: company,
                position:  -1 // indicates not in queue
            })

            // Inform others in queue of new position
            currentFair.booths[company].queue.applicantIds.forEach(applicant => {
                const socketId = this.users.getSocketId(careerFair, applicant);
                this.namespace.to(socketId).emit("updatePosition",
                    {
                        company: company,
                        position: currentFair.booths[company].queue.getPosition(applicant)
                    });
            });

            // Update everyone of queue state
            this.updateQueue(careerFair, company, currentFair.booths[company].queue.getLength());
        }
        
    }

    private async startNextMeeting(socket: any, careerFair: string, company: string)
    {
        // Get career fair
        const currentFair = await CareerFair.getLiveCareerFair(careerFair);

        // If empty queue, return customError
        if (currentFair.booths[company].queue.getLength() == 0)
        {
            socket.emit("customError", "No applicants in queue");
        }

        // Else get next applicant
        const nextApplicant = currentFair.booths[company].queue.dequeue();

        // Notify queue of change
        this.updateQueue(careerFair, company, currentFair.booths[company].queue.getLength())

        // If this applicant is not connected, log customError and give up, let client side retry
        if (!this.users.hasUserId(nextApplicant, careerFair))
        {
            socket.emit("customError", "Applicant not logged in.");
            //TODO: More robust solution to this, currently applicant is dropped from queue if not logged in when it is their turn
        }
        // Else, return confirmation to caller i.e. recruiter - starts timeout on recruiter client side to end call if applicant doesn't pick up for too long
        else
        {
            // Send calling notification to 
            socket.emit("callingApplicant",
            {
                applicant: nextApplicant
            });

            const companyData = (await Company.db.findOne({_id: company}));

            // Call applicant
            this.namespace.to(this.users.getSocketId(careerFair, nextApplicant)).emit("incomingMeetingCall", 
            {
                company: companyData.name,
                recruiter: this.users.getUserId(careerFair, socket.id)
            });
        }
    }

    private cancelMeeting(socket: any, applicant: string, careerFair: string)
    {
        // Cancel call to applicant
        if (!this.users.hasUserId(applicant, careerFair))
        {
            socket.emit("customError", "Applicant no longer logged in.");
        }
        else
        {
            this.namespace.to(this.users.getSocketId(careerFair, applicant)).emit("cancelCall");
        }
    }

    private acceptMeetingCall(careerFair: string, recruiter: string, peerJsId: string) 
    {
        this.namespace.to(this.users.getSocketId(careerFair, recruiter)).emit("acceptMeetingCall", 
        {
            peerJsId: peerJsId
        });
    }

    // Public API to trigger emits

    // Update queue broadcasts to all clients that the queue has been updated for a given company at a given career fair
    public updateQueue(careerFair: string, company: string, numInQueue: number)
    {
        this.namespace.to(careerFair).emit('queueUpdate',
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