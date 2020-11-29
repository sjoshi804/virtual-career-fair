import React from "react";
import { Card } from "react-bootstrap"; 

class FairCard extends React.Component
{
    render()
    {
        return(
            <Card style={{boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <Card.Header>{this.props.fair.status}</Card.Header>
            <Card.Body>
                <Card.Title>{this.props.fair.name}</Card.Title>
                <Card.Text>
                    <p>
                    <b>Organizer: </b>{this.props.fair.organizer}
                    </p>
                    <p>
                    <b>Starts: </b>{this.props.fair.startTime.toString()}
                    </p>
                    <p>
                    <b>Ends: </b>{this.props.fair.endTime.toString()}
                    </p>
                </Card.Text>
            </Card.Body>
            </Card>
        );
    }
}

export { FairCard }