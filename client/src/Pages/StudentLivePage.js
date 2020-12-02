import React from "react";
import {Card, CardDeck, Button} from "react-bootstrap";
import google from '../Images/google.jpg'; 
import {MoreInfo} from './MoreInfo'
import { baseUrl } from "../.config";
import Peer from 'peerjs';
const io = require('socket.io-client');
const testCareerFairId = "5fc39d53403560f171489b2a";

export default class StudentLivePage extends React.Component {
    constructor(props)
    {
      super(props);
      this.state = 
      {
        careerFairId: testCareerFairId,
        companies: []
      }
      this.echo = this.echo.bind(this);
    }

    /*
      - Retrieve booth data to display
      - Establish socket connection and join career fair room
      - Create peer js object and register incoming call handler
    */
    async componentDidMount()
    {   
        /*
        SOCKET
        */
        // Create socket
        this.clientSocket = io("ws://localhost:3000/careerfair");

        // Register handler for queueUpdate - refer to CareerFairSocketProtocol for schema of data
        this.clientSocket.on("queueUpdate", (data) =>
        {
          const companyId = data.company;
          const numInQueue = data.numInQueue;
          console.log(companyId, numInQueue);

          // Update UI to reflect this
          this.setState(
            {
              companies: companies.map(
                company => 
                {
                  if (company.id == companyId)
                  {
                    company.numInQueue = numInQueue;
                    return company;
                  }
                  else 
                  {
                    return company;
                  }
                }
              )
            }
          );
        });

        // Handler for position update
        this.clientSocket.on("updatePosition", (data) =>
        {
          const companyId = data.company;
          const position = data.position;
          console.log(companyId, "position", position);

          // Update UI to reflect this
          this.setState(
            {
              companies: companies.map(
                company => 
                {
                  if (company.id == companyId)
                  {
                    company.position = position;
                    return company;
                  }
                  else 
                  {
                    return company;
                  }
                }
              )
            }
          );
        });

        // TODO: Register handler for announcement
        this.clientSocket.on("announcement", (data) =>
        {
          console.log(data.message);
        });

        this.clientSocket.on("boothData", (data) =>
        {
          // Booth data
          var newCompanies = []
          for (let company of this.state.companies)
          {
            company.numInQueue = data[company.id]["numInQueue"];
            company.position = data[company.id]["position"];
            newCompanies.push(company);
          }

          this.setState({companies: newCompanies});
        });

        // For test / debug purposes enable echo
        this.clientSocket.on("echo", (message) =>
        {
            console.log("Echo received: " + message);
        });

        // Connect
        this.clientSocket.connect();

        // Join careerFair
        this.clientSocket.emit("join", {
          careerFair: this.state.careerFairId || testCareerFairId,
          token: localStorage.getItem("Authorization")
        });

        /*
        Instantiate Peer JS Peer
        */
       this.peer = new Peer();
       this.peer.on('open', (id) =>
       {
          this.peerJsId = id; 
          console.log("PeerJSId", id);
       });

        /*
        Load Booth Data
        */
        // FIXME: Get this from the career fair api
        var headers = new Headers();
        headers.append("Authorization", localStorage.getItem("Authorization"));
        const companies =  await fetch(baseUrl + `/careerfair/${this.state.careerFairId}/company/`, {
          headers: headers,
          method: "GET"
        })
        .then(response => response.json());
        console.log("Companies retrieved");
        
        for (let company of companies)
        {
          company.id = company._id;
          company.numInQueue = 0;
          company.position = -1;
        }
        
        this.setState({
          companies: companies
        });
    }

    echo()
    {
        console.log("Attempting to echo");
        this.clientSocket.emit("echo", "Hello World");
    }

    // Methods to communicate with backend socket
    // --------------------------------------------------
    joinQueue = (companyId) => () =>
    {
      this.clientSocket.emit("joinQueue", 
      {
        careerFair: this.state.careerFairId || testCareerFairId,
        company: companyId
      });
    }

    leaveQueue = (companyId) => () =>
    {
      this.clientSocket.emit("leaveQueue", 
      {
        careerFair: this.state.careerFairId || testCareerFairId,
        company: companyId
      });
    }

    acceptIncomingCall = (recruiter) => () =>
    {
      // 
      this.clientSocket.emit("acceptMeetingCall", 
      {
        recruiter: recruiter, 
        peerJsId: this.peerJsId
      });
    }

    // --------------------------------------------------
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    var items = []
    for (const [index, value] of this.state.companies.entries()) {
      var onlineRecruiters = [];
      value.recruiters.forEach(element => {
        onlineRecruiters.push(
        <b>{element}</b>)
      });
      items.push(
          
            <Card style={{boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", maxWidth: "200px"}}>
            <Card.Img variant="top" style={{ height: "auto",
                    width: "80%",
                    marginTop: "5%",
                    marginBottom: "5%",
                    marginLeft: "10%"
            }}
            src={value.image || google} maxHeight="250px" />
            <Card.Body>
            <Card.Title><b>{value.name}</b></Card.Title>
            <MoreInfo></MoreInfo>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted"> 
            { value.position != -1 ?
            <h7 style={{"font-size": "15px"}}>
              <b>Position: </b> {value.position + 1}/{value.numInQueue}</h7> :
              <h7 style={{"font-size": "15px"}}>
              <b>Queue: </b> {value.numInQueue}</h7> 
            }

            <h1></h1>
            <Button  size="sm" onClick={value.position == -1 ? this.joinQueue(value.id) : this.leaveQueue(value.id)} variant={value.position == -1 ? "outline-success" : "outline-danger"} >{value.position == -1 ? "Join Queue" : "Leave Queue"}</Button></small>
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

