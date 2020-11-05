import React from "react";
import { Row, Col, Container, Card, Button, CardGroup, Image} from "react-bootstrap";
import profile from '../Images/profile.jpg'; 
// import profile from '../Images/profile.jpg'; 

export default class RecruiterProfilePage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
        <div>
        <div style={{ "color": "black", "padding": "20px"}}>
            <Card className="text-center" style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <Card.Header><h2>Profile</h2></Card.Header>
                <Card.Body>
                    <Image src={profile} rounded height="150px"/>
                    <br></br>
                    <br></br>
                    <Card.Title>John Doe</Card.Title>
                    <Card.Text>
                        <p> <b>Company: </b> Google </p>
                        <p> <b>Position: </b> University Recruiter </p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>

      <div style={{ "background-color": "white", color: "white", "color": "black", "padding": "20px" }}>
        <Card className="text-center" style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
        <Card.Header><h3>Live Career Fairs</h3></Card.Header>
        <Card.Body>
            <Card.Title>Career Fair: UCLA Engineering Tech Fair</Card.Title>
            <Card.Text>
            October 21, 2020 from 11AM-2PM PST.
            </Card.Text>
            <Button variant="outline-success">Join Now</Button>
        </Card.Body>
        </Card>
        </div>

      <div style={{ "background-color": "white", color: "white", "text-align": "center", "color": "black", "padding": "20px" }}>
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
        <Card.Header><h3>Upcoming Career Fairs</h3></Card.Header>
        <Card>
        <Card.Body>
            <Card.Title>Career Fair: Harvey Mudd College Computer Science Fair </Card.Title>
            <Card.Text>
            November 4, 2020 @ 11AM-3PM PST
            </Card.Text>
            <Button variant="outline-dark" onClick={this.handleRoute("/add-edit-booth")}>Add/Edit Booth</Button>
        </Card.Body>
        </Card>
        <Card>
        <Card.Body>
            <Card.Title>Career Fair: University of Washington Engineering Fair </Card.Title>
            <Card.Text>
            November 5, 2020 @ 10AM-2PM PST
            </Card.Text>
            <Button variant="outline-dark" onClick={this.handleRoute("/add-edit-booth")}>Add/Edit Booth</Button>
        </Card.Body>
        </Card>
        <Card>
        <Card.Body>
            <Card.Title>Career Fair: Columbia Universtiy Computer Science Fair </Card.Title>
            <Card.Text>
            November 6, 2020 @ 12-5PM PST
            </Card.Text>
            <Button variant="outline-dark" onClick={this.handleRoute("/add-edit-booth")}>Add/Edit Booth</Button>
        </Card.Body>
        </Card>
        </Card>
      </div>


      <div style={{ "background-color": "white", color: "white", "text-align": "center", "color": "black", "padding": "20px" }}>
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
        <Card.Header><h3>Past Career Fairs</h3></Card.Header>
        <Card>
        <Card.Body>
            <Card.Title>Career Fair: Harvey Mudd College Computer Science Fair </Card.Title>
            <Card.Text>
            October 4, 2020 @ 11AM-3PM PST
            </Card.Text>
            <Button variant="outline-dark">View Fair</Button>
        </Card.Body>
        </Card>
        <Card>
        <Card.Body>
            <Card.Title>Career Fair: University of Washington Engineering Fair </Card.Title>
            <Card.Text>
            October 5, 2020 @ 10AM-2PM PST
            </Card.Text>
            <Button variant="outline-dark">View Fair</Button>
        </Card.Body>
        </Card>
        <Card>
        <Card.Body>
            <Card.Title>Career Fair: Columbia Universtiy Computer Science Fair </Card.Title>
            <Card.Text>
            October 6, 2020 @ 12-5PM PST
            </Card.Text>
            <Button variant="outline-dark">View Fair</Button>
        </Card.Body>
        </Card>
        </Card>
      </div>
      </div>
    );
  }
}
