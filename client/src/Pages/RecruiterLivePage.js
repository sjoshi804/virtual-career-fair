import React from "react";
import {Card, CardDeck, Button} from "react-bootstrap";
import google from '../Images/google.jpg'; 
import microsoft from '../Images/microsoft.jpg'; 
import facebook from '../Images/facebook.jpg'; 
import apple from '../Images/apple.jpg'; 
import tesla from '../Images/tesla.jpg'; 
import snapchat from '../Images/snapchat.jpg'; 
import qualcomm from '../Images/qualcomm.jpg'; 
import paypal from '../Images/paypal.jpg'; 
import netflix from '../Images/netflix.jpg'; 
import {MoreInfo} from './MoreInfo'

export default class RecruiterLivePage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
      <div style={{padding: "20px", "text-align": "center"}}>
        <Card style={{padding: "20px"}}>
            <Card>
                <Card.Header as="h5">Position 1</Card.Header>
                <Card.Body>
                    <Card.Title>Denise Wang</Card.Title>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="outline-dark">Go somewhere</Button>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header as="h5">Position 2</Card.Header>
                <Card.Body>
                    <Card.Title>Siddharth Joshi</Card.Title>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="outline-dark">Go somewhere</Button>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header as="h5">Position 3</Card.Header>
                <Card.Body>
                    <Card.Title>Arnav Garg</Card.Title>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="outline-dark">Go somewhere</Button>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header as="h5">Position 4</Card.Header>
                <Card.Body>
                    <Card.Title>Yingge Zhou</Card.Title>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="outline-dark">Go somewhere</Button>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header as="h5">Position 5</Card.Header>
                <Card.Body>
                    <Card.Title>Gautam Nambiar</Card.Title>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="outline-dark">Go somewhere</Button>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header as="h5">Position 6</Card.Header>
                <Card.Body>
                    <Card.Title>Jayant Mehra</Card.Title>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="outline-dark">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Card>
      </div>
    );
  }
}
