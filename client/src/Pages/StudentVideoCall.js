import React from "react";
import { Card, Button, CardGroup, Image, Form} from "react-bootstrap";
import Peer from 'peerjs'
import { baseUrl, socketBaseUrl } from "../.config";

const io = require('socket.io-client');

export default class StudentVideoCall extends React.Component {
    constructor(props)
    {
        super(props);
        this.endCall = this.endCall.bind(this);
    }
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
    };


    endCall()
    {
        // Peer JS End Call 
        this.peer.destroy();

        // TODO: Redirect back to career fair - pass in dynamic url here
        this.handleRoute(`/student-live/`)();
    }
    
    render() {


        const recruiterId = this.props.match.params.recruiterId;
        console.log(recruiterId);
        // Set up Peer JS
        this.peer = new Peer();
        
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // Answer call listener
        this.peer.on('call', function(call) 
        {
            getUserMedia({video: true, audio: true}, function(stream) 
            {
                document.getElementById('myVideo').srcObject = stream; 

                call.answer(stream); // Answer the call with an A/V stream.

                call.on('stream', function(remoteStream) 
                {
                    // Show stream in some video/canvas element.
                    document.getElementById('partnerVideo').srcObject = remoteStream; 
                });
            }, 
            function(err) 
            {
                console.log('Failed to get local stream' ,err);
            });
        });

        this.peer.on('disconnected', () =>
        {
            //TODO: Dynamic redirect back to live career fair page
            this.handleRoute(`/student-live`)();
        })

        // Set up listener for when the peer js connection opens
        this.peer.on('open', function(id) {
            console.log('My peer ID is: ' + id);
            // Send accept meeting call to server
            this.clientSocket = io(`${socketBaseUrl}/careerfair`);
            this.clientSocket.connect();
            this.clientSocket.emit("acceptMeetingCall", 
            {
                token: localStorage.getItem("Authorization"),
                recruiter: recruiterId,
                peerJsId: id
            });
        });

        return (
            <div style={{ "color": "black", "margin": "auto"}}>
            <div className="text-center" style={{ "color": "black", "padding": "20px"}}>
                <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "padding": "20px"}}>
                    <h2>Meeting with Recruiter</h2> 
                </Card>
            </div>
            <div style={{ "color": "black", "padding": "20px"}}>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{"display": "inline", "margin": "auto"}}>
                    <div style={{"display": "inline-block"}}>
                        <video id="partnerVideo" style={{ "margin": "20px"}} width="600" height="480" autoPlay>
                            <source src={null} type="video/mp4"/>
                        </video>
                    </div>
                    <div style={{"display": "inline-block"}}>
                        <video id="myVideo"  style={{ "margin": "20px"}} width="240" height="180" muted autoPlay>
                            <source src={null} type="video/mp4"/>
                        </video>
                    </div>
                </div>
                <Button style={{"margin": "auto", "width": "30%", "margin-bottom": "20px"}} onClick={this.endCall}variant="outline-danger">Return to Fair</Button>{' '}
            </Card>
        </div>
        </div>
        );
    }
}
