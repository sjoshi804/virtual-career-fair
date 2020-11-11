import React from "react";
import { Row, Col, Container, Card, Button, CardGroup, Image} from "react-bootstrap";
import profile from '../Images/profile.jpg'; 

export default class StudentProfilePage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
      <div style={{ "background-color": "white", color: "white", "text-align": "center" }}>
        <div style={{ "color": "black", "padding": "20px"}}>
            <Card className="text-center" style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <Card.Header><h1>Profile</h1></Card.Header>
                <Card.Body>
                    <Image src={profile} rounded height="150px"/>
                    <br></br>
                    <br></br>
                    <Card.Title>Denise Wang</Card.Title>
                    <Card.Text>
                        <p> <b>School: </b> University of California, Los Angeles (UCLA) </p>
                        <p> <b>Expected graduation: </b> June 2021 </p>
                        <p> <b>Seeking:</b> Full time software engineering roles.</p>
                    </Card.Text>
                    <Button variant="light">Upload Resume</Button>
                </Card.Body>
                {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
            </Card>
        </div>
                <CardGroup style={{ "width": "100%", "padding": "20px 20px 0 20px"}}>
                    <Card style={{ "padding-bottom": "10px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}} >
                    <div style={{ "color": "black"}}>
                        <Card.Header><h3>Career Fair #1</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Status: </b> Registered</Card.Title>
                        <Card.Text>
                            <p><b>Date: </b>Today, October 25, 2020</p>
                            <p><b>Time: </b>Live Now, 11 PST - 3PM PST</p>
                        </Card.Text>
                        </Card.Body>
                        <Button onClick={this.handleRoute("/studentlive")} variant="outline-danger">Join Now</Button>
                    </div>
                    </Card>
                    <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                    <div style={{ "color": "black"}}>
                        <Card.Header><h3>Career Fair #2</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Status: </b> Registered</Card.Title>
                        <Card.Text>
                            <p><b>Date: </b>Monday, October 26, 2020</p>
                            <p><b>Time: </b> 11AM PST - 5PM PST</p>
                        </Card.Text>
                        </Card.Body>
                        <Button variant="outline-dark" onClick={this.handleRoute("/student-upcoming")}>Event Details</Button>
                    </div>
                    </Card>
                    <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                    <div style={{ "color": "black"}}>
                        <Card.Header><h3>Career Fair #3</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Status: </b> Not Registered</Card.Title>
                        <Card.Text>
                            <p><b>Date: </b>Tuesday, October 27, 2020</p>
                            <p><b>Time: </b>10AM PST - 3PM PST</p>
                        </Card.Text>
                        </Card.Body>
                        <Button variant="outline-dark">View Event</Button>
                    </div>
                    </Card>
                </CardGroup>
                <CardGroup style={{ "width": "100%", "padding": "0 20px 20px 20px"}}>
                    <Card style={{ "padding-bottom": "10px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                    <div style={{ "color": "black"}}>
                        <Card.Header><h3>Career Fair #4</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Status: </b>Not Registered</Card.Title>
                        <Card.Text>
                            <p><b>Date: </b>Thursday, November 5, 2020</p>
                            <p><b>Time: </b> 11 PST - 3PM PST</p>
                        </Card.Text>
                        </Card.Body>
                        <Button onClick={this.handleRoute("/studentlive")} variant="outline-dark">View Event</Button>
                    </div>
                    </Card>
                    <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                    <div style={{ "color": "black"}}>
                        <Card.Header><h3>Career Fair #5</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Status: </b> Not Registered</Card.Title>
                        <Card.Text>
                            <p><b>Date: </b>Wednesday, November 11, 2020</p>
                            <p><b>Time: </b> 11AM PST - 5PM PST</p>
                        </Card.Text>
                        </Card.Body>
                        <Button variant="outline-dark">View Event</Button>
                    </div>
                    </Card>
                    <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                    <div style={{ "color": "black"}}>
                        <Card.Header><h3>Career Fair #6</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Status: </b> Not Registered</Card.Title>
                        <Card.Text>
                            <p><b>Date: </b>Tuesday, November 17, 2020</p>
                            <p><b>Time: </b>10AM PST - 3PM PST</p>
                        </Card.Text>
                        </Card.Body>
                        <Button variant="outline-dark">View Event</Button>
                    </div>
                    </Card>
                </CardGroup>
      </div>
    );
  }
}
