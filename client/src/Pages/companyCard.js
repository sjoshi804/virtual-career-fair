import React from "react";
import { Card } from "react-bootstrap"; 
import google from '../Images/google.jpg'; 

class CompanyCard extends React.Component
{

    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto"}}> 
                <Card.Img variant="top" src={google} height="200" />
                </div>
                <Card.Body>
                <Card.Title><b>{this.props.name}</b></Card.Title>
                <Card.Text>
                    {this.props.description}
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {this.props.industry}
                </Card.Footer>
            </Card>
        );
    }
}

export { CompanyCard }