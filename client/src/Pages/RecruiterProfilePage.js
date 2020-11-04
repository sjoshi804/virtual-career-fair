import React from "react";
import { Row, Col, Container, Card, Button, CardGroup, Image} from "react-bootstrap";
// import profile from '../Images/profile.jpg'; 

export default class RecruiterProfilePage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
        <div>
      <div style={{ "background-color": "white", color: "white", "text-align": "center", "color": "black", "padding": "20px" }}>
        <Card className="text-center" style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
        <Card.Header><h3>Live Career Fairs</h3></Card.Header>
        <Card.Body>
            <Card.Title>Career Fair #1</Card.Title>
            <Card.Text>
                This career fair is for the UCLA Engineering Fair on October 21, 2020 from 11AM-2PM PST.
            </Card.Text>
            <Button variant="outline-success">Join Now</Button>
        </Card.Body>
        </Card>
        </div>
      </div>
    );
  }
}
