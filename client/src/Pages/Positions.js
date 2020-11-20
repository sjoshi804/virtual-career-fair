import React from "react";
import { Card, CardDeck, Button } from "react-bootstrap"; 

export const Positions = () => { 
    const fairs = ['Software Engineer for Google', 'Frontend developer for Microsoft', 'Backend developer for Facebook', 'Marketing for Apple', 'UI/UX for Tesla', 'AI deveopment for Snapchat'];
    const items = []
  
    for (const [index, value] of fairs.entries()) {
      items.push(
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
        <div style={{ "width": "200px", "margin": "auto"}}> 
       
        </div>
        <Card.Body>
        <Card.Title>{value}</Card.Title>
        <Card.Text>
            <br></br>
            <b>Recruiter: </b> John Doe
            <br></br>
            <br></br>
            <b>Status: </b> In session
        </Card.Text>
        </Card.Body>
        <Card.Footer>
        <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Students in Queue: </b> 15 </h7> 
        <h1></h1>
        <Button variant="outline-secondary" size="sm">Join Booth</Button></small>
        <br></br>
        </Card.Footer>
    </Card>
      )
    }
    return (
      <>
        <CardDeck>
            {items[0]}  {items[1]}  {items[2]}
            
        </CardDeck>
            <br></br>
        <CardDeck>
            {items[3]}  {items[4]}  {items[5]}
        </CardDeck>
      </>
    );
  }
  
//   render(<Example />);
