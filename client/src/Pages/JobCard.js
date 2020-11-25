import React from "react";
import { Card } from "react-bootstrap"; 

class JobCard extends React.Component
{
    render()
    {
        return (
            <Card style={{boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <Card.Body>
                    <Card.Title>{this.props.job.title}</Card.Title>
                    <Card.Text>
                        {this.props.job.description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {this.props.job.company}
                </Card.Footer>
            </Card>
        );
    }
}

export { JobCard }
