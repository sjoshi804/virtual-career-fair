import React from "react";
import { Row, Col, Container, Card, Button, CardGroup, Image} from "react-bootstrap";
import profile from '../Images/profile.jpg'; 

export default class StudentProfilePage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    const livecareerfairs = ['1'];
    const liveitems = []
  
    for (const [index, value] of livecareerfairs.entries()) {
      liveitems.push(
          // FIXME: onClick listener should redirect to /live/careerFairId -> renders StudentLivePage with this.prop.careerFairId
        <Card style={{ "padding-bottom": "10px", "width": "50%", "margin": "auto"}} key={index}>
            <Card.Header><h3>Career Fair #{value}</h3></Card.Header>
            <Card.Body>
            <Card.Text>
                <p><b>Date: </b>Today, October 25, 2020</p>
                <p><b>Time: </b>Live Now, 11 PST - 3PM PST</p>
                <Button onClick={this.handleRoute("/student-live")} variant="outline-success">Join Now</Button>
            </Card.Text>
            </Card.Body>
        </Card>
      )
    }
    const registered = 1;
    const upcoming_careerfairs = ['2', '3', '4'];
    const upcoming_reg = []
    const upcoming_unreg = []
  
    for (const [index, value] of upcoming_careerfairs.entries()) {
        if (registered){
            upcoming_reg.push(
          
                <Card style={{ "padding-bottom": "10px", "width": "50%", "margin": "auto"}} key={index}>
                    <Card.Header><h3>Career Fair #{value}</h3></Card.Header>
                    <Card.Body>
                    <Card.Text>
                        <p><b>Date: </b>Today, October 25, 2020</p>
                        <p><b>Time: </b>Live Now, 11 PST - 3PM PST</p>
                        <Button variant="outline-dark" onClick={this.handleRoute("/student-upcoming")}>View Details</Button>
                    </Card.Text>
                    </Card.Body>
                </Card>)
        }
        else{
            upcoming_unreg.push(
          
                <Card style={{ "padding-bottom": "10px", "width": "50%", "margin": "auto"}} key={index}>
                    <Card.Header><h3>Career Fair #{value}</h3></Card.Header>
                    <Card.Body>
                    <Card.Text>
                        <p><b>Date: </b>Today, October 25, 2020</p>
                        <p><b>Time: </b>Live Now, 11 PST - 3PM PST</p>
                        <Button variant="outline-dark" onClick={this.handleRoute("/student-upcoming")}>View Details</Button>
                    </Card.Text>
                    </Card.Body>
                </Card>)
        }
      
    }

    const pastcareerfairs = ['7', '8', '9'];
    const pastitems = []
  
    for (const [index, value] of pastcareerfairs.entries()) {
      pastitems.push(
          
        <Card style={{ "padding-bottom": "10px", "width": "50%", "margin": "auto"}} key={index}>
            <Card.Header><h3>Career Fair #{value}</h3></Card.Header>
            <Card.Body>
            <Card.Text>
                <p><b>Date: </b>Today, October 25, 2020</p>
                <p><b>Time: </b>Live Now, 11 PST - 3PM PST</p>
                <Button variant="outline-dark" onClick={this.handleRoute("/student-past")}>View Fair</Button>
            </Card.Text>
            </Card.Body>
        </Card>
      )
    }
    return (
      <div style={{ "background-color": "white", color: "white", "textAlign": "center" }}>
        <div style={{ "color": "black", "padding": "20px"}}>
            <Card className="text-center" style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
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
                    <Button variant="light" onClick={this.handleRoute("/student-resume")}>Upload Resume</Button>
                </Card.Body>
                {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
            </Card>
        </div>
        <div style={{"padding": "20px", "color": "black"}}>
            <Card style={{"padding": "20px", "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
               <Card.Header><h2><b>Live Career Fairs</b></h2></Card.Header>
                <p></p>
                    {liveitems}
            </Card>
        </div>
        <div style={{"padding": "20px", "color": "black"}}>
            <Card style={{"padding": "20px", "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
            <Card.Header><h2><b>Upcoming Career Fairs (Registered)</b></h2></Card.Header>
                <CardGroup style={{ "width": "100%", "padding": "0 20px 20px 20px", "paddingTop": "20px"}}>
                    {upcoming_reg}
                </CardGroup>
            </Card>
            </div>
            <div style={{"padding": "20px", "color": "black"}}>
                <Card style={{"padding": "20px", "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
                <Card.Header><h2><b>Upcoming Career Fairs (Not Registered)</b></h2></Card.Header>
                    <CardGroup style={{ "width": "100%", "padding": "0 20px 20px 20px", "paddingTop": "20px"}}>
                        {upcoming_unreg}
                    </CardGroup>
                </Card>
            </div>
            <div style={{"padding": "20px", "color": "black"}}>
            <Card style={{"padding": "20px", "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
            <Card.Header><h2><b>Past Career Fairs Attended</b></h2></Card.Header>
                <CardGroup style={{ "width": "100%", "padding": "0 20px 20px 20px", "paddingTop": "20px"}}>
                    {pastitems}
                </CardGroup>
            </Card>
            </div>
      </div>
    );
  }
}
