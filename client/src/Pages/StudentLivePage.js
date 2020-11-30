import React from "react";
import {Card, CardDeck, Button} from "react-bootstrap";
import google from '../Images/google.jpg'; 
import microsoft from '../Images/microsoft.jpg'; 
import facebook from '../Images/facebook.jpg'; 
import apple from '../Images/apple.jpg'; 
import tesla from '../Images/tesla.jpg'; 
import snapchat from '../Images/snapchat.jpg'; 
import qualcomm from '../Images/qualcomm.jpg'; 
import paypal from '../Images/paypal.jpg'; 
import netflix from '../Images/netflix.jpg'; 
import {MoreInfo} from './MoreInfo'

const io = require('socket.io-client');
const clientSocket = io("ws://localhost:3000/careerFair");
export default class StudentLivePage extends React.Component {
    constructor()
    {
      super();
    }

    componentDidMount()
    {
        // Register handler for queueUpdate - refer to CareerFairSocketProtocol for schema of data
        clientSocket.on("queueUpdate", (data) =>
        {

        });

        // Register handler for announcement
        clientSocket.on("announcement", (data) =>
        {

        });

        // For test / debug purposes enable echo
        clientSocket.on("echo", (message) =>
        {
            console.log("Echo received: " + message);
        });

        // Connect
        clientSocket.connect();

        // Join careerFair
        clientSocket.emit("join", "CAREER_FAIR_ID");
    }

    echo()
    {
        console.log("Attempting to echo");
        clientSocket.emit("echo", "Hello World");
    }

    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    const companies = ['Netflix', 'Google', 'Snapchat', 'Qualcomm', 'Tesla', 'Microsoft', 'Facebook', 'Apple', 'Paypal'];
    const items = []
  
    for (const [index, value] of companies.entries()) {
      items.push(
          
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <div style={{ "width": "200px", "margin": "auto"}}> 
            <Card.Img variant="top" src={google} height="200" />
            </div>
            <Card.Body>
            <Card.Title>{value}</Card.Title>
            <MoreInfo></MoreInfo>
            <Card.Text>
                <br></br>
                <b>Recruiter: </b> John Doe
                <br></br>
                <br></br>
                <b>Status: </b> In session
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Position: </b> 2/10</h7> 
            <h1></h1>
            <Button variant="outline-secondary" size="sm" onClick={this.echo}>In Session</Button></small>
            <br></br>
            </Card.Footer>
        </Card>
      )
    }
//<Button variant="outline-success" size="sm" href="https://meet.google.com/ezb-yrqf-vsq">Join Now</Button></small>
   
    return (
      <div style={{ "text-align": "center", "margin": "20px 20px" }}>
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "margin-bottom": "20px"}}>
          <br></br>
          <h2><b>Career Fair #1</b></h2>
          <br></br>
          <h5><b>Date: </b>Today, October 25, 2020</h5>
          <br></br>
          <h5><b>Time: </b>Live Now, 11 PST - 3PM PST</h5>
          <br></br>
        </Card>
        <CardDeck>
                {items[0]}  {items[1]}  {items[2]}
            </CardDeck>
            <br></br>
            <CardDeck>
                {items[3]}  {items[4]}  {items[5]}
            </CardDeck>
            <br></br>
            <CardDeck>
                {items[6]}  {items[7]}  {items[8]}
            </CardDeck>
      </div>
    );
  }
}

