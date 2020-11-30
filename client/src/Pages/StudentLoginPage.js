import React from "react";
import { Tab , Tabs, Card, Form, Button, Col} from "react-bootstrap";
const passwordHash = require('password-hash');
export default class StudentLoginPage extends React.Component {
    constructor()
    {
        super();
        this.state = 
        {
            email: null,
            firstName: null,
            lastName: null,
            password: null
        }

        // Bind methods to instance
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
    }
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };

    async signUp()
    {
        // Send request to sign up to backend
        const token = 
            (await fetch('http://localhost:3000/applicant/',
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                {
                    name: this.state.firstName + this.state.lastName,
                    email: this.state.email,
                    password: this.state.hashedPassword
                })
            })
            .then(response => response.json())).token;

        console.log(token);
    }

    async signIn()
    {
        const hashedPassword = 
        (await fetch('http://localhost:3000/user/initiateLogin/',
        {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
            {
                email: this.state.email
            })
        }
        )
        .then(response => response.json())).hashedPassword;

        if (passwordHash.verify(this.state.password, hashedPassword))
        {
            const token = 
            (await fetch('http://localhost:3000/user/login/',
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                {
                    email: this.state.email
                })
            })
            .then(response => response.json())).token;
            
            console.log(token);
        }
        else
        {
            console.log("Incorect username or password");
        }
        
    }

    // Change listeners to put form values in state
    handleEmailChange(e)
    {
        this.setState({email: e.target.value});
    };

    handlePasswordChange(e)
    {
        this.setState({password: e.target.value});
    }

    handleFirstNameChange(e)
    {
        this.setState({firstName: e.target.value});
    }

    handleLastNameChange(e)
    {
        this.setState({lastName: e.target.value});
    }

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
                                <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange} />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>
                            <Button variant="primary" onClick={this.signIn}>
                                Sign In
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
                                <Form.Control placeholder="First name" value={this.state.firstName} onChange={this.handleFirstNameChange}/>
                                </Col>
                                <Col>
                                Last name
                                <Form.Control placeholder="Last name" value={this.state.lastName} onChange={this.handleLastNameChange}/>
                                </Col>
                            </Form.Row>
                            </Form>
                            <br></br>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange} />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>
                            <Button variant="primary" onClick={this.signUp}>
                                Sign Up
                            </Button>
                        </Form>
                        </Tab>
                    </Tabs>
                </Card>
        </div>
    );
    }
}
