import React from "react";
import { Row, Col, Container, Card, Button, CardGroup, Image} from "react-bootstrap";
import profile from '../Images/profile.jpg'; 
// import profile from '../Images/profile.jpg'; 

export default class RecruiterProfilePage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    const livecareerfairs = ['UCLA Engineering Tech Fair'];
    const liveitems = []
  
    for (const [index, value] of livecareerfairs.entries()) {
      liveitems.push(
          
        <Card style={{ "padding-bottom": "10px", "width": "50%", "margin": "auto"}} key={index}>
            <Card.Header><h3>Career Fair :{value}</h3></Card.Header>
            <Card.Body>
            <Card.Text>
                October 21, 2020 from 11AM-2PM PST
                <Button variant="outline-success" onClick={this.handleRoute("/recruiter-live")}>Join Now</Button>
            </Card.Text>
            </Card.Body>
        </Card>
      )
    }

    const upcoming_careerfairs = ['Harvey Mudd College Computer Science Fair', 'University of Washington Engineering Fair', 'Columbia Universtiy Computer Science Fair'];
    const upcoming_items = []
  
    for (const [index, value] of upcoming_careerfairs.entries()) {
            upcoming_items.push(
          
                <Card style={{ "padding-bottom": "10px", "width": "50%", "margin": "auto"}} key={index}>
                    <Card.Header><h3>Career Fair: {value}</h3></Card.Header>
                    <Card.Body>
                    <Card.Text>
                        <p><b>Date: </b>Today, October 25, 2020</p>
                        <p><b>Time: </b>Live Now, 11 PST - 3PM PST</p>
                        <Button variant="outline-dark" onClick={this.handleRoute("/add-edit-booth")}>Add/Edit Booth</Button>
                    </Card.Text>
                    </Card.Body>
                </Card>)
      
    }

    const pastcareerfairs = ['Harvey Mudd College Computer Science Fair', 'University of Washington Engineering Fair', 'Columbia Universtiy Computer Science Fair'];
    const pastitems = []
  
    for (const [index, value] of pastcareerfairs.entries()) {
      pastitems.push(
          
        <Card style={{ "padding-bottom": "10px", "width": "50%", "margin": "auto"}} key={index}>
            <Card.Header><h3>Career Fair #{value}</h3></Card.Header>
            <Card.Body>
            <Card.Text>
                <p><b>Date: </b>Today, October 25, 2020</p>
                <p><b>Time: </b>Live Now, 11 PST - 3PM PST</p>
                <Button variant="outline-dark" onClick={this.handleRoute("/recruiter-past")}>View Fair</Button>
            </Card.Text>
            </Card.Body>
        </Card>
      )
    }

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
            {liveitems}
        </Card.Body>
        </Card>
        </div>

      <div style={{ "background-color": "white", color: "white", "text-align": "center", "color": "black", "padding": "20px" }}>
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
        <Card.Header><h3>Upcoming Career Fairs</h3></Card.Header>
            {upcoming_items}
        </Card>
      </div>


      <div style={{ "background-color": "white", color: "white", "text-align": "center", "color": "black", "padding": "20px" }}>
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
        <Card.Header><h3>Past Career Fairs</h3></Card.Header>
        {pastitems}
        </Card>
      </div>
      </div>
    );
  }
}
