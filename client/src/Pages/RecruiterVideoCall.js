import React from "react";
import { Card, Button, CardGroup, CardDeck, Image, Form} from "react-bootstrap";
import Peer from 'peerjs';
import { baseUrl } from "../.config";
const io = require('socket.io-client');

export default class RecruiterVideoCall extends React.Component {
    constructor(props){
        super(props);
        this.state = 
        {
            notes: ""
        }
        this.endCall = this.endCall.bind(this);
        this.handleNotesChange = this.handleNotesChange.bind(this);
    }

    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
    };

    async endCall()
    {
        // Peer JS End Call 
        this.peer.destroy();

        // TODO: Post notes to db
        const reponse = await fetch(`${baseUrl}/meetingnotes`, 
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("Authorization")
            },
            body: JSON.stringify(
            {
                applicantId: this.props.match.params.applicantId,
                careerFairId: this.props.match.params.careerFairId,
                companyId: this.props.match.params.companyId,
                notes: this.notes
            })
        });

        // TODO: Redirect back to career fair - pass in dynamic url here
        this.handleRoute(`/recruiter-live/${this.props.match.params.careerFairId}/${this.props.match.params.companyName}`)();
    }

    handleNotesChange(e) {
        // do something with notes
        this.notes = e.target.value;
    };

    render() {
        const peerJsId = this.props.match.params.peerJsId;
        const applicantPeerJsId = this.props.match.params.applicantPeerJsId;
        this.peer = new Peer();
        const peer = this.peer;
        peer.on('open', (id) =>
        {
            console.log("Peer JS ID", id);
            console.log("Calling", applicantPeerJsId)
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            
            getUserMedia({video: true, audio: true}, function(stream) 
            {
                document.getElementById('myVideo').srcObject = stream; 
                var call = peer.call(applicantPeerJsId, stream);
                call.on('stream', function(remoteStream) {
                    document.getElementById('partnerVideo').srcObject = remoteStream; 
                });
            }, 
            function(err) {
                console.log('Failed to get local stream' ,err);
            });
        });

        return (
            <div style={{ "color": "black", "margin": "auto"}}>
            <div className="text-center" style={{ "color": "black", "padding": "20px"}}>
                <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "padding": "20px"}}>
                    <h2>Meeting with Student</h2> 
                </Card>
            </div>
            <CardDeck>
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
                    <Button style={{"margin": "auto", "width": "30%", "margin-bottom": "20px"}} variant="outline-danger" onClick={this.endCall}>End Call</Button>{' '}
                </Card>
            </div>
            <div className="text-center" style={{ "color": "black", "padding": "20px"}}>
                <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "padding": "20px"}}>
                    <h2>Notes</h2>
                    <Form.Group style={{"width": "80%", "margin": "auto"}} controlId="exampleForm.ControlTextarea1">
                                <Form.Control onChange={this.handleNotesChange}as="textarea" rows={6} />
                    </Form.Group>
                </Card>
            </div>
            </CardDeck>
            </div>
        );
    }
}
