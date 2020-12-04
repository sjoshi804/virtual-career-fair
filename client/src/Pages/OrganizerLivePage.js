import React from "react";
import {Card, CardDeck, Button} from "react-bootstrap";
import {DetailedStats} from './DetailedStats'

export default class OrganizerLivePage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (       
      <div style={{ "textAlign": "center", "margin": "20px 20px" }}>
        <Card style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "marginBottom": "20px"}}>
        <Card.Body>  
          <br></br>
          <h2><b>Career Fair #1  (Live)</b></h2>
          <br></br>
          <h5><b>Date: </b>Today, October 25, 2020</h5>
          <br></br>
          <h5><b>Time: </b>Live Now, 11 PST - 3PM PST</h5>
          <br></br>
          <Button variant="light" onClick={this.handleRoute("/organizer")}>Back to Profile Page</Button>
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
                <b>Recruiters Attending: </b> {Math.floor(Math.random() * Math.floor(5)) + 2}
                <br></br>
                <br></br>
                <b>Recruiters Registered: </b>{Math.floor(Math.random() * Math.floor(5)) + 5}
            </Card.Text>
            <DetailedStats></DetailedStats>
            </Card.Body>
        </Card>
        <Card  border="danger" style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "width": "300px"}}>
            <div style={{ "width": "200px", "margin": "auto", "paddingTop": "10px"}}> 
            </div>
            <Card.Body>
            <Card.Title>Number of Students at Fair</Card.Title>
            
            <Card.Text>
            <br></br>
                <b>Students Attending: </b> {Math.floor(Math.random() * Math.floor(5)) + 2}
                <br></br>
                <br></br>
                <b>Students Registered: </b> {Math.floor(Math.random() * Math.floor(5)) + 5}
            </Card.Text>
            <DetailedStats></DetailedStats>
            </Card.Body>
        </Card>
        </CardDeck>
        <br></br>
        <CardDeck>
        <Card  border="dark" style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <div style={{ "width": "200px", "margin": "auto", "paddingTop": "10px"}}> 
            </div>
            <Card.Body>
            <Card.Title>Number of Companies at Fair</Card.Title>
            
            <Card.Text>
            <br></br>
                <b>Companies Attending: </b> {Math.floor(Math.random() * Math.floor(5)) + 2}
                <br></br>
                <br></br>
                <b>Companies Registered: </b> {Math.floor(Math.random() * Math.floor(5)) + 5}
            </Card.Text>
            <DetailedStats></DetailedStats>
            </Card.Body>
        </Card>
        
        <Card  border="primary" style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <div style={{"width": "200px", "margin": "auto", "paddingTop": "10px"}}> 
            </div>
            <Card.Body>
            <Card.Title>Number of Interviews Conducted at Fair</Card.Title>
            
            <Card.Text>
            <br></br>
            {Math.floor(Math.random() * Math.floor(5)) + 15}
                <br></br>
                
            </Card.Text>
            </Card.Body>
        </Card>
        </CardDeck>
      </div>
    );
  }
}

