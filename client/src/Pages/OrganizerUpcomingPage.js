import React from "react";
import {Card, CardDeck, Button} from "react-bootstrap";
import {DetailedStatsUpc} from './DetailedStatsUpc'

export default class OrganizerUpcomingPage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (       
      <div style={{ "textAlign": "center", "margin": "20px 20px" }}>
        <Card style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "marginBottom": "20px"}}>
        <Card.Body>
          <br></br>
          <h2><b>Career Fair #6  (Schedueled)</b></h2>
          <br></br>
          <h5><b>Date: </b>Today, October 25, 2020</h5>
          <br></br>
          <h5><b>Time: </b>11 PST - 3PM PST</h5>
          <br></br>
          <Button variant="light" onClick={this.handleRoute("/organizer")}>Back to Profile Page</Button>
          <Button variant="light" onClick={this.handleRoute("/managefair")}>Edit Fair Info</Button>
         </Card.Body>
        </Card>
    <CardDeck>
        <Card  border="success" style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <div style={{ "width": "200px", "margin": "auto"}}> 
            </div>
            <Card.Body>
            <Card.Title>Number of Recruiters at Fair</Card.Title>
            
            <Card.Text>
        
                <br></br>
                <b>Recruiters Registered: </b> 15
            </Card.Text>
            <DetailedStatsUpc></DetailedStatsUpc>
            </Card.Body>
        </Card>
        <Card  border="danger" style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "width": "300px"}}>
            <div style={{ "width": "200px", "margin": "auto", "paddingTop": "10px"}}> 
            </div>
            <Card.Body>
            <Card.Title>Number of Students at Fair</Card.Title>
            
            <Card.Text>
            
                <br></br>
                <b>Students Registered: </b> 40
            </Card.Text>
            <DetailedStatsUpc></DetailedStatsUpc>
            </Card.Body>
        </Card>
        
        <Card  border="dark" style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <div style={{ "width": "200px", "margin": "auto", "paddingTop": "10px"}}> 
            </div>
            <Card.Body>
            <Card.Title>Number of Companies at Fair</Card.Title>
            
            <Card.Text>
            
                <br></br>
                <b>Companies Registered: </b> 10
            </Card.Text>
            <DetailedStatsUpc></DetailedStatsUpc>
            </Card.Body>
        </Card>
        </CardDeck>
      </div>
    );
  }
}

