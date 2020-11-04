import React from "react";
import { Form, Card, Button } from "react-bootstrap";

export default class LoginPage extends React.Component {
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
            <Form.Label style={{"color": "black", "text-align": "left"}}>Organization Name</Form.Label>
          </Card.Text>
          <Form.Control type="email" placeholder="Enter organization name" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label style={{"color": "black", "text-align": "left"}}>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.handleroute("/org")}>
          Sign Up
        </Button>
        </Form>
        </Card>
      </div>
    );
  }
}


/*import React from "react";
import { Button, Form } from "react-bootstrap";

export default class LoginPage extends React.Component{
    
    render() {
        return (
            <div>
      <div style={{padding: "100px", "text-align": "center", background: "#9393A6", "color": "white"}}>
        <h1>JobZ</h1>
        <p>
          <h4>
            A virtual career for students, recruiters, and organizers.
          </h4>
        </p>
      </div>
     
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
        
    );}
    
    
  }*/