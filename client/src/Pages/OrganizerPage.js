import React from "react";
import { Card, Button, CardGroup, Image} from "react-bootstrap";
import profile from '../Images/profile.jpg'; 

export default class OrganizerPage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    const livecareerfairs = ['1', '2', '3'];
    const liveitems = []
  
    for (const [index, value] of livecareerfairs.entries()) {
      liveitems.push(
          
        <Card style={{ "padding-bottom": "10px", "width": "50%", "margin": "auto"}} key={index}>
            <Card.Header><h3>Career Fair #{value}</h3></Card.Header>
            <Card.Body>
            <Card.Text>
                <p><b>Date: </b>Today, October 25, 2020</p>
                <p><b>Time: </b>Live Now, 11 PST - 3PM PST</p>
                <Button onClick={this.handleRoute("/orglive")} variant="outline-success">Observe Fair</Button>
            </Card.Text>
            </Card.Body>
        </Card>
      )
    }

    const upcoming_careerfairs = ['4', '5', '6'];
    const upcoming_items = []
  
    for (const [index, value] of upcoming_careerfairs.entries()) {
      upcoming_items.push(
          
        <Card style={{ "padding-bottom": "10px", "width": "50%", "margin": "auto"}} key={index}>
            <Card.Header><h3>Career Fair #{value}</h3></Card.Header>
            <Card.Body>
            <Card.Text>
                <p><b>Date: </b>Today, October 25, 2020</p>
                <p><b>Time: </b>Live Now, 11 PST - 3PM PST</p>
                <Button onClick={this.handleRoute("/orgupcoming")} variant="outline-success">Edit Fair</Button>
            </Card.Text>
            </Card.Body>
        </Card>
      )
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
                <Button onClick={this.handleRoute("/orgpast")} variant="outline-success">View Fair History</Button>
            </Card.Text>
            </Card.Body>
        </Card>
      )
    }
  
    return (
      <div style={{ "background-color": "white", color: "white", "text-align": "center" }}>
          <div style={{ "color": "black", "padding": "20px"}}>
            <Card className="text-center" style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <Card.Header><h1>Profile</h1></Card.Header>
                <Card.Body>
                    <Image src={profile} rounded height="150px"/>
                    <br></br>
                    <br></br>
                    <Card.Title>University of California, Los Angeles (UCLA)</Card.Title>
                                <Card.Text>
                                    <p> <b>Organizer Description: </b> School within the UC system </p>
                                </Card.Text>
                        <Button variant="light" onClick={this.handleRoute("/createfair")}>Create New Career Fair</Button>
                </Card.Body>
            </Card>
        </div>

        <div style={{"padding": "20px", "color": "black"}}>
            <Card style={{"padding": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
               <Card.Header><h2><b>Live Career Fairs</b></h2></Card.Header>
                <p></p>
                <CardGroup style={{ "width": "100%", "padding": "0 20px 20px 20px", "padding-top": "20px"}}>
                    {liveitems}
                </CardGroup>
            </Card>
        </div>
        <div style={{"padding": "20px", "color": "black"}}>
            <Card style={{"padding": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
            <Card.Header><h2><b>Upcoming Career Fairs</b></h2></Card.Header>
                <CardGroup style={{ "width": "100%", "padding": "0 20px 20px 20px", "padding-top": "20px"}}>
                    {upcoming_items}
                </CardGroup>
            </Card>
            </div>
            
            <div style={{"padding": "20px", "color": "black"}}>
            <Card style={{"padding": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
            <Card.Header><h2><b>Past Career Fairs</b></h2></Card.Header>
                <CardGroup style={{ "width": "100%", "padding": "0 20px 20px 20px", "padding-top": "20px"}}>
                    {pastitems}
                </CardGroup>
                
            </Card>
            </div>
      </div>
    )
    
  }
}
