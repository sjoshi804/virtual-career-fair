import React from "react";
import { Form, Container, Button } from "react-bootstrap";

export default class CreateFairPage extends React.Component {
  handleroute = routes => () => {
    this.props.history.push({ pathname: routes });
  };

  render() {
    return (
      <div style={{ "background-color": "#84849A", color: "white", "text-align": "center", "height": "100vh" }}>
        {/* <h1>STUDENTS</h1> */}
        <Container>
        <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>New Fair Name</Form.Label>
          <Form.Control type="email" placeholder="Enter organization name" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Time Period of Career Fair</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.handleroute("/org")}>
          Create Career Fair
        </Button>
      </Form>
        </Container>
      </div>
    );
  }
}
