import React from "react";
import { Card } from "react-bootstrap"; 
import google from '../Images/google.jpg'; 

class CompanyCard extends React.Component
{
    render()
    {
        return (
            <Card style={{boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", maxWidth: "200px"}}>
                <Card.Img variant="top" style={{ height: "auto",
                        width: "80%",
                        marginTop: "5%",
                        marginBottom: "5%",
                        marginLeft: "10%"
                }}
                src={this.props.company.image || google} maxHeight="250px" />
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