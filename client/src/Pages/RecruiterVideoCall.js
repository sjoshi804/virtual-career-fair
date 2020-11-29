import React from "react";
import { Card, Button, CardGroup, Image, Form} from "react-bootstrap";
import Peer from "simple-peer";
const io = require('socket.io-client');

export default class RecruiterVideoCall extends React.Component {

    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
    };

    constructor(props){
        super(props);
        this.state = {
            stream: null
        }
    }

    componentDidMount() {
        // Setup socket connection
        this.clientSocket = io("ws://localhost:3000/careerFair", {
            query: {
                username: this.props.username   
            }
        });

        // Register handler for queueUpdate - refer to CareerFairSocketProtocol for schema of data
        this.clientSocket.on("queueUpdate", (data) => {

        });

        // Register handler for announcement
        this.clientSocket.on("announcement", (data) => {

        });

        // For test / debug purposes enable echo
        this.clientSocket.on("echo", (message) => {
            console.log("Echo received: " + message);
        });

        // Connect
        this.clientSocket.connect();

        this.echo();

        // Get user's video and audio stream
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                document.getElementById('myVideo').srcObject = stream;   
            });

        // if (this.props.username === "user2")
        // {
        //     console.log("I am the student.");
        //     this.clientSocket.emit("")
        // }
    
    }

    echo() {
        console.log("Attempting to echo");
        this.clientSocket.emit("echo", "Hello World");
    }

    startNextMeeting() {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            config: {
                iceServers: [
                    {
                        urls: "stun:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    },
                    {
                        urls: "turn:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    }
                ]
            },
            stream: this.state.stream,
        });
    
        peer.on("signal", data => {
            this.clientSocket.emit("startNextMeeting", { 
                careerFair: 'careerFair', 
                company: 'jobZ',
                signalData: data
            });
        });
    
        peer.on("stream", stream => {
          var partnerVideo = document.getElementById('partnerVideo');
          if (partnerVideo) {
                partnerVideo.srcObject = stream;
            }
        });
    
      }

    startCall() {

    }

    acceptCall() {

    }
  
    render() {
        console.log(!this.state.stream);
        return (
            <div style={{ "color": "black", "margin": "auto"}}>
            <div className="text-center" style={{ "color": "black", "padding": "20px"}}>
                <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "padding": "20px"}}>
                    <h2>Video Call With Student Applicant</h2> 
                </Card>
            </div>
            <div style={{ "color": "black", "padding": "20px"}}>
                <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                    <div style={{"display": "inline"}}>
                        <div style={{"display": "inline-block"}}>
                            <video autoplay="true" id="myVideo" style={{ "margin": "20px"}} width="480" height="360" controls>
                                <source src={this.state.stream} type="video/mp4"/>
                            </video>
                        </div>
                        <div style={{"display": "inline-block"}}>
                            <video autoplay="true" id="partnerVideo" style={{ "margin": "20px"}} width="480" height="360" controls>
                                <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"/>
                            </video>
                        </div>
                        <Button onClick={this.startNextMeeting}>Start Call</Button>
                        { true ? <Button onClick={this.acceptCall}>Accept Call</Button> : null}
                    </div>
                </Card>
            </div>
            <div className="text-center" style={{ "color": "black", "padding": "20px"}}>
                <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "padding": "20px"}}>
                    <h2>Notes</h2>
                    <Form.Group style={{"width": "80%", "margin": "auto"}} controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows={6} />
                    </Form.Group>
                    <Button size="sm" variant="outline-dark" style={{"width": "50px", "margin": "auto", "margin-top": "20px" }}>Save</Button>  
                </Card>
            </div>
            </div>
        );
    }
}
