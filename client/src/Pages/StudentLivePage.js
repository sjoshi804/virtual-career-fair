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

export default class StudentLivePage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
      <div style={{ "text-align": "center", "margin": "20px 20px" }}>
        <CardDeck>
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <div style={{ "width": "200px", "margin": "auto"}}> 
            <Card.Img variant="top" src={google} height="200" />
            </div>
            <Card.Body>
            <Card.Title>Google</Card.Title>
            <Card.Text>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-dark" size="sm">In Session</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
            <Card.Img variant="top" src={microsoft} height="200"/>
            </div>
            <Card.Body>
            <Card.Title>Microsoft</Card.Title>
            <Card.Text>
            <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-dark" size="sm">In Session</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
            <Card.Img variant="top" src={facebook} height="200"/>
            </div>
            <Card.Body>
            <Card.Title>Facebook</Card.Title>
            <Card.Text>
            <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-dark" size="sm">In Session</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        </CardDeck>
        <br></br>
        <CardDeck>
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <div style={{ "margin": "auto", "width": "300px"}}> 
            <Card.Img variant="top" src={apple} height="200px"/>
            </div>
            <Card.Body>
            <Card.Title>Apple</Card.Title>
            <Card.Text>
            <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-dark" size="sm">In Session</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
            <Card.Img variant="top" src={tesla} height="200"/>
            </div>
            <Card.Body>
            <Card.Title>Tesla</Card.Title>
            <Card.Text>
            <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-dark" size="sm">In Session</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
            <Card.Img variant="top" src={snapchat} height="200"/>
            </div>
            <Card.Body>
            <Card.Title>Snapchat</Card.Title>
            <Card.Text>
            <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-dark" size="sm">In Session</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        </CardDeck>
        <br></br>
        <CardDeck>
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
            <Card.Img variant="top" src={qualcomm} height="200"/>
            </div>
            <Card.Body>
            <Card.Title>Qualcomm</Card.Title>
            <Card.Text>
            <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-dark" size="sm">In Session</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
            <Card.Img variant="top" src={paypal} height="200"/>
            </div>
            <Card.Body>
            <Card.Title>PayPal</Card.Title>
            <Card.Text>
            <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-dark" size="sm">In Session</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
            <Card.Img variant="top" src={netflix} />
            </div>
            <Card.Body>
            <Card.Title>Netflix</Card.Title>
            <Card.Text>
            <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-dark" size="sm">In Session</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
                <br></br>
                <br></br>
                Recruiter: John Doe &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outline-secondary" size="sm">Join Now</Button>{' '}
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        </CardDeck>
      </div>
    );
  }
}
