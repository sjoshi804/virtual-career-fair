import React from "react";
import { Form, Card, Button } from "react-bootstrap";

export default class CreateFairPage extends React.Component {
  handleroute = routes => () => {
    this.props.history.push({ pathname: routes });
  };

  render() {
    return (
      <div style={{ "background-color": "white", color: "white", "width": "500px", "margin": "auto", "margin-top": "20vh"}}>
        <Card style={{"padding": "50px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
        <Form>
        <Form.Group controlId="formBasicEmail">
          <Card.Text>
            <Form.Label style={{"color": "black", "text-align": "left"}}>New Fair Name</Form.Label>
          </Card.Text>
          <Form.Control type="fairname" placeholder="Enter the name of the career fair" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Card.Text>
            <Form.Label style={{"color": "black", "text-align": "left"}}>Fair Time Period</Form.Label>
          </Card.Text>
          <Form.Control type="date" placeholder="Time Period of the career fair" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.handleroute("/org")}>
          Create
        </Button>
        </Form>
        </Card>
      </div>
    );
  }
}
