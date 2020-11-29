import React from "react";
import { Card } from "react-bootstrap"; 
import google from '../Images/google.jpg'; 

class CompanyCard extends React.Component
{
    render()
    {
        return (
            <Card style={{boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto"}}> 
                <Card.Img variant="top" src={google} height="200" />
                </div>
                <Card.Body>
                <Card.Title><b>{this.props.company.name}</b></Card.Title>
                <Card.Text>
                    {this.props.company.description}
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {this.props.company.industry}
                </Card.Footer>
            </Card>
        );
    }
}

export { CompanyCard }