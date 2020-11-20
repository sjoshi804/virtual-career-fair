import React from "react";
import { Card, CardGroup, Button } from "react-bootstrap"; 

export const Fairs = () => { 
    const handleRoute = routes => () => {
        this.props.history.push({ pathname: routes });
      };

    const fairs = ['UCLA', 'UCSB', 'UCB', 'UCI', 'UCSD', 'UCD'];
    const items = []
  
    for (const [index, value] of fairs.entries()) {
      items.push(
          
        <Card style={{ "padding-bottom": "10px", "width": "50%", "margin": "auto"}} key={index}>
            <Card.Header><h3>Career Fair held by {value}</h3></Card.Header>
            <Card.Body>
            <Card.Title><b>Status: </b> Open</Card.Title>
            <Card.Text>
                <p><b>Organizer: </b>UCLA</p>
                <p><b>Date: </b>Today, October 25, 2020</p>
                <p><b>Time: </b>Live Now, 11 PST - 3PM PST</p>
               
            </Card.Text>
            </Card.Body>
        </Card>
      )
    }


    return (

      <>
        <CardGroup style={{ "width": "100%"}}>
            {items[0]}  {items[1]}  {items[2]}
        </CardGroup>
        <br></br>
        <CardGroup style={{ "width": "100%"}}>
            {items[3]}  {items[4]}  {items[5]}
        </CardGroup>
      </>
    );
  }
  
//   render(<Example />);
