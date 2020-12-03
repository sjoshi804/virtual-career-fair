import React from "react";
import { Card, Button, CardGroup, CardDeck, Image, Form} from "react-bootstrap";
import Peer from 'peerjs';
const io = require('socket.io-client');

export default class RecruiterVideoCall extends React.Component {
    constructor(props){
        super(props);
    }

    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
    };

  render() {
    const peerJsId = this.props.match.params.peerJsId;
    const applicantPeerJsId = this.props.match.params.applicantPeerJsId;
    const peer = new Peer();
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
                <h2>Video Call With Student Applicant</h2> 
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
                <Button style={{"margin": "auto", "width": "30%", "margin-bottom": "20px"}} variant="outline-danger">End Call</Button>{' '}
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
        </CardDeck>
        </div>
    );
  }
}
