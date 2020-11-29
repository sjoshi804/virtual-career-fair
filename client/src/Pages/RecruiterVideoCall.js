import React from "react";
import { Card, Button, CardGroup, Image, Form} from "react-bootstrap";
import Peer from 'peerjs';
import { Socket } from "socket.io-client";
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
        console.log(this.props.username);
        this.clientSocket = io("ws://localhost:3000", {
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
/*
        // Get user's video and audio stream
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                document.getElementById('myVideo').srcObject = stream;   
                this.setState(
                    {
                        stream: stream
                    }
                )
            });
            */

        const peer = new Peer();
        peer.on('open', (id) =>
        {
            this.clientSocket.emit("peerId", peer.id);
            console.log(id);
        });

        this.clientSocket.on("user2", (peerId) =>
        {
            if (peerId != peer.id)
            {
                var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                getUserMedia({video: true, audio: true}, function(stream) {
                document.getElementById('myVideo').srcObject = stream; 
                var call = peer.call(peerId, stream);
                call.on('stream', function(remoteStream) {
                    document.getElementById('partnerVideo').srcObject = remoteStream; 
                });
                }, function(err) {
                console.log('Failed to get local stream' ,err);
                });
            }
            else 
            {
                var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                peer.on('call', function(call) {
                    
                getUserMedia({video: true, audio: true}, function(stream) {
                    document.getElementById('myVideo').srcObject = stream; 
                call.answer(stream); // Answer the call with an A/V stream.
                call.on('stream', function(remoteStream) {
                // Show stream in some video/canvas element.
                document.getElementById('partnerVideo').srcObject = remoteStream; 
                });
                }, function(err) {
                console.log('Failed to get local stream' ,err);
                });
                });
            }
        });
        
    }

    echo() {
        console.log("Attempting to echo");
        this.clientSocket.emit("echo", "Hello World");
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
                            <video autoplay="true" id="myVideo" style={{ "margin": "20px"}} width="480" height="360"  muted playsInline>
                                <source src={this.state.stream} type="video/mp4"/>
                            </video>
                        </div>
                        <div style={{"display": "inline-block"}}>
                            <video autoplay="true" id="partnerVideo" style={{ "margin": "20px"}} width="480" height="360"  playsInline>
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
