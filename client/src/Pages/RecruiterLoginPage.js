import React from "react";
import { Tab , Tabs, Card, Form, Button, Col} from "react-bootstrap";
import profile from '../Images/profile.jpg'; 
// import profile from '../Images/profile.jpg'; 

export default class RecruiterLoginPage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
        <div style={{"padding": "20px"}}>
                <Card style={{"box-shadow": "8px 4px 8px 4px rgba(0,0,0,0.2)", "padding": "20px", "max-width": "80%", "margin": "auto"}}>
                    <Tabs defaultActiveKey="signin" id="uncontrolled-tab-example" style={{"margin": "auto"}}>
                        <Tab eventKey="signin" title="Sign In">
                        <h3>Sign In</h3> 
                        <Form style={{"padding-top": "10px"}}>
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
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={this.handleRoute("/recruiter")}>
                                Submit
                            </Button>
                        </Form>
                        </Tab>
                        <Tab eventKey="signup" title="Sign Up">
                        <h3>Create an account</h3> 
                        <Form style={{"padding-top": "10px"}}>
                            <Form>
                            <Form.Row>
                                <Col>
                                First name
                                <Form.Control placeholder="First name" />
                                </Col>
                                <Col>
                                Last name
                                <Form.Control placeholder="Last name" />
                                </Col>
                            </Form.Row>
                            </Form>
                            <br></br>
                            <Form.Group controlId="formBasicCompany">
                                <Form.Label>Company</Form.Label>
                                <Form.Control type="email" placeholder="Enter company" />
                            </Form.Group>
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
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={this.handleRoute("/recruiter")}>
                                Submit
                            </Button>
                        </Form>
                        </Tab>
                    </Tabs>
                </Card>
        </div>
    );
  }
}
