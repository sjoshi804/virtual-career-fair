import React from "react";
import { Card } from "react-bootstrap"; 

class FairCard extends React.Component
{
    render()
    {
        return(
            <Card style={{ "paddingBottom": "10px", "width": "50%", "margin": "auto"}}>
            <Card.Header>{this.props.fair.status}</Card.Header>
            <Card.Body>
                <Card.Title>{this.props.fair.title}</Card.Title>
                <Card.Text>
                    <p><b>Organizer: </b>{this.props.fair.organizer}</p>
                    <p><b>Starts: </b>{this.props.fair.startTime}</p>
                    <p><b>Ends: </b>{this.props.fair.endTime}</p>
                </Card.Text>
            </Card.Body>
            </Card>
        );
    }
}

export { FairCard }