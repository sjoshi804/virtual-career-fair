import React from "react";
import {Card, CardDeck, Button, Image} from "react-bootstrap";
import profile from '../Images/profile.jpg'; 

export default class RecruiterLivePage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
      <div style={{padding: "20px", "text-align": "center"}}>
        <Card style={{"padding": "20px", "box-shadow": "8px 4px 8px 4px rgba(0,0,0,0.2)"}}>
            <h3><b>Live Career Fair:</b> UCLA Engineering Tech Fair</h3>
            <h6>Students in queue for Google full-time software engineering roles.</h6>
        </Card>
        <br></br>
        <Card style={{padding: "20px", "box-shadow": "8px 4px 8px 4px rgba(0,0,0,0.2)"}}>
            <Card>
                <Card.Header as="h5">Position 1</Card.Header>
                <Card.Body>
                    <Image src={profile} rounded height="150px"/>
                    <Card.Title style={{"margin-top": "10px"}}>Denise Wang</Card.Title>
                    <Card.Text>
                    Student bio if they have one.
                    </Card.Text>
                    <Button size="sm" variant="outline-success" href="https://meet.google.com/ezb-yrqf-vsq">Join Now</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button size="sm" variant="outline-dark" href="https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf">View Resume</Button>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header as="h5">Position 2</Card.Header>
                <Card.Body>
                    <Image src={profile} rounded height="150px"/>
                    <Card.Title style={{"margin-top": "10px"}}>Siddharth Joshi</Card.Title>
                    <Card.Text>
                    Student bio if they have one.
                    </Card.Text>
                    <Button size="sm" variant="outline-secondary" disabled style={{ pointerEvents: 'none' }}>Position 2</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button size="sm" variant="outline-dark" href="https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf">View Resume</Button>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header as="h5">Position 3</Card.Header>
                <Card.Body>
                    <Image src={profile} rounded height="150px"/>
                    <Card.Title style={{"margin-top": "10px"}}>Arnav Garg</Card.Title>
                    <Card.Text>
                    Student bio if they have one.
                    </Card.Text>
                    <Button size="sm" variant="outline-secondary" disabled style={{ pointerEvents: 'none' }}>Position 3</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button size="sm" variant="outline-dark" href="https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf">View Resume</Button>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header as="h5">Position 4</Card.Header>
                <Card.Body>
                    <Image src={profile} rounded height="150px"/>
                    <Card.Title style={{"margin-top": "10px"}}>Yingge Zhou</Card.Title>
                    <Card.Text>
                    Student bio if they have one.
                    </Card.Text>
                    <Button size="sm" variant="outline-secondary" disabled style={{ pointerEvents: 'none' }}>Position 4</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button size="sm" variant="outline-dark" href="https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf">View Resume</Button>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header as="h5">Position 5</Card.Header>
                <Card.Body>
                    <Image src={profile} rounded height="150px"/>
                    <Card.Title style={{"margin-top": "10px"}}>Gautam Nambiar</Card.Title>
                    <Card.Text>
                    Student bio if they have one.
                    </Card.Text>
                    <Button size="sm" variant="outline-secondary" disabled style={{ pointerEvents: 'none' }}>Position 5</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button size="sm" variant="outline-dark" href="https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf">View Resume</Button>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header as="h5">Position 6</Card.Header>
                <Card.Body>
                    <Image src={profile} rounded height="150px"/>
                    <Card.Title style={{"margin-top": "10px"}}>Jayant Mehra</Card.Title>
                    <Card.Text>
                    Student bio if they have one.
                    </Card.Text>
                    <Button size="sm" variant="outline-secondary" disabled style={{ pointerEvents: 'none' }}>Position 6</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button size="sm" variant="outline-dark" href="https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf">View Resume</Button>
                </Card.Body>
            </Card>
        </Card>
      </div>
    );
  }
}
