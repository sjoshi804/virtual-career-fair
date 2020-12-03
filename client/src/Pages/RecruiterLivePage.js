import React from "react";
import {Card, Button, Image, Table, Form} from "react-bootstrap";
import Countdown from "react-countdown";
import { baseUrl } from "../.config";
const io = require('socket.io-client');
const Completionist = () => <span>Career fair ended.</span>;
const testCareerFairId = "5fc39d53403560f171489b2a";
const testCompanyId = "5fbde92b766609b584e59545";

class RecruiterLivePage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = 
        {
            careerFairName: "Test Career Fair",
            organizer: "Test Organizer",
            careerFairId: testCareerFairId,
            companyId: testCompanyId,
            numInQueue: 0
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

       this.setState({
         careerFairName: careerFairData.name,
         organizer: careerFairData.organizer
       })
       /*
       PeerJS
       */

       /*
       Socket
       /*
        /*
        SOCKET
        */
        // Create socket
        this.clientSocket = io("ws://localhost:3000/careerfair");

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
        //TODO: Dynamically populate stuents and notes  from the meetingnotes endpoint
        const students = ['Denise Wang', 'Siddharth Joshi', 'Arnav Garg'];
        const items = []
    

        for (const [index, value] of students.entries()) {
            // TODO: The button must be made to link to a given student's resume page
        items.push(
            <tr>
                <td>{value}</td>
                <td>Full-time software engineering (frontend)</td>
                <td>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </td>
                <td><Button size="sm" variant="outline-dark" href="https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf">View Resume</Button></td>
            </tr>
        )
        }

        return (
        <div style={{padding: "20px", "text-align": "center"}}>
            <Card style={{"padding": "20px", "box-shadow": "8px 4px 8px 4px rgba(0,0,0,0.2)"}}>
                <h2><b>{this.state.careerFairName}</b></h2>
            </Card>
            <br></br>
            <Card style={{"padding": "20px", "box-shadow": "8px 4px 8px 4px rgba(0,0,0,0.2)"}}>
                <h4>
                    <b>Time left in career fair:</b>
                </h4>
                <h5>
                    <Countdown date={Date.now() + 500000000}>
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
                        <th>Interests</th>
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
