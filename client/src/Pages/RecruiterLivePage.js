import React from "react";
import {Card, Button, Image, Table, Form} from "react-bootstrap";
import Countdown from "react-countdown";
import { baseUrl, socketBaseUrl } from "../.config";
import Peer from 'peerjs';

const io = require('socket.io-client');

const Completionist = () => <span>Career fair ended.</span>;
const testCareerFairId = "5fc39d53403560f171489b2a";

const microsoftId = "5fbde92b766609b584e59545";
const atlassianId = "5fbdec768c1b12b5c4645afa";


class RecruiterLivePage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            careerFairName: "Test Career Fair",
            organizer: "Test Organizer",
            companyName: props.match.params.companyName || "",
            careerFairId: props.match.params.careerFairId || testCareerFairId,
            companyId: (props.match.params.companyName == 'Microsoft'? microsoftId : atlassianId),
            numInQueue: 0,
            notes: []
        }
        this.startNextMeeting = this.startNextMeeting.bind(this);
    }

    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
    
    async componentDidMount()
    {
        // Fetch career fair data from API
        /*
        Get Career Fair Data
        */
        var headers = new Headers();
        headers.append("Authorization", localStorage.getItem("Authorization"));
        const careerFairData = await fetch(baseUrl + `/careerfair/${this.state.careerFairId}`, {
            headers: headers,
            method: "GET"
        })
        .then(response => response.json());

        const notesUrl = baseUrl + "/meetingnotes/company/" + this.state.companyId + "/careerfair/" + this.state.careerFairId;
        const meetingNoteData = await fetch(notesUrl, {
            method: "GET",
            headers: headers
        })
        .then(response => response.json());
        
        var meetingNotes = [];
        for (let note of meetingNoteData) {
            console.log(note);
            var user = await fetch(baseUrl + "/applicant/" + note.applicantId, {
                method: "GET",
                headers: headers
            })
            .then(response => response.json());

            note.name = user.name;
            note.school = user.affiliatedSchool;
            note.major = user.major;
            note.graduationYear = user.graduationYear;
            meetingNotes.push(note);
        }

        this.setState({
            careerFairName: careerFairData.name,
            organizer: careerFairData.organizer,
            notes: meetingNotes
        });

        /*
        PeerJS
        */
       this.peer = new Peer();

       this.peer.on("open", (id) =>
       {
           console.log("Peer JS ID", id);
           this.peerJsId = id;
       })

        /*
        SOCKET
        */
        // Create socket
        this.clientSocket = io(`${socketBaseUrl}/careerfair`);

        // Handler to collect booth Data to populate cards
        this.clientSocket.on("boothData", (data) =>
        {
            this.setState({numInQueue: data[this.state.companyId].numInQueue});
        });

        // Register handler for queueUpdate - refer to CareerFairSocketProtocol for schema of data
        this.clientSocket.on("queueUpdate", (data) =>
        {
          if(data.company == this.state.companyId)
          {
            // Update UI to reflect this
            this.setState(
                {
                    numInQueue: data.numInQueue
                }
            )
            }
        });

        // Accepted call listener 
        this.clientSocket.on("acceptMeetingCall", (data) =>
        {
            console.log("Call acceptance");
            this.handleRoute(`/recruiter-video-call/${this.state.careerFairId}/${this.state.companyId}/${data.applicantId}/${data.peerJsId}/${this.state.companyName}`)();
        })

        // Connect
        this.clientSocket.connect();

        // Join careerFair
        this.clientSocket.emit("join", {
          careerFair: this.state.careerFairId || testCareerFairId,
          token: localStorage.getItem("Authorization")
        });
    }

    // Ask server to start next meeting
    startNextMeeting()
    {
        this.clientSocket.emit("startNextMeeting", 
        {
            careerFair: this.state.careerFairId,
            company: this.state.companyId
        })
    }

    render() {
        
        const items = []
        for (let note of this.state.notes) {
            // TODO: The button must be made to link to a given student's resume page
            items.push(
                <tr>
                    <td>{note.name}</td>
                    <td>{note.school}</td>
                    <td>{note.major}</td>
                    <td>{note.graduationYear}</td>
                    <td>{note.notes}</td>
                    <td><Button size="sm" variant="outline-success" onClick={this.handleRoute("/recruiter-resume/" + note.applicantId)}>View Resume</Button></td>
                </tr>
            )
        }

        return (
        <div style={{padding: "20px", "text-align": "center"}}>
            <Card style={{"padding": "20px", "box-shadow": "8px 4px 8px 4px rgba(0,0,0,0.2)"}}>
                <h1><b>{this.state.careerFairName}</b></h1>
                <h4><b>{this.state.companyName}</b></h4>
            </Card>
            <br></br>
            <Card style={{"padding": "20px", "box-shadow": "8px 4px 8px 4px rgba(0,0,0,0.2)"}}>
                <h4>
                    <b>Time left in career fair:</b>
                </h4>
                <h5>
                    <Countdown date={Date.now() + 5000000}>
                        <Completionist />
                    </Countdown>
                </h5>
                <h6></h6>
                <h4>
                    <b>Students In Queue:</b>
                </h4>
                <h5>{this.state.numInQueue}</h5>
                <h6></h6>
                <h4>
                    <h6></h6>
                    <Button variant="outline-success" disabled={this.state.numInQueue == 0} onClick={this.startNextMeeting}>Start Next Meeting</Button>
                </h4>
            </Card>
            <br></br>
            <Card style={{padding: "20px", "box-shadow": "8px 4px 8px 4px rgba(0,0,0,0.2)"}}>
                <h3>Today's Notes</h3>
                <p></p>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Affiliated School</th>
                        <th>Major</th>
                        <th>Graduation Year</th>
                        <th style={{"width": "40%"}}>Notes</th>
                        <th>Resume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </Table>
            </Card>
        </div>
        );
    }
}

export default RecruiterLivePage