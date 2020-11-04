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
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "margin-bottom": "20px"}}>
          <br></br>
          <h2><b>Career Fair #1</b></h2>
          <br></br>
          <h5><b>Date: </b>Today, October 25, 2020</h5>
          <br></br>
          <h5><b>Time: </b>Live Now, 11 PST - 3PM PST</h5>
          <br></br>
        </Card>
        <CardDeck>
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <div style={{ "width": "200px", "margin": "auto"}}> 
            <Card.Img variant="top" src={google} height="200" />
            </div>
            <Card.Body>
            <Card.Title>Google</Card.Title>
            <Card.Text>
                <br></br>
                <b>Recruiter: </b> John Doe
                <br></br>
                <br></br>
                <b>Status: </b> In session
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Position: </b> 2/10</h7> 
            <h1></h1>
            <Button variant="outline-secondary" size="sm">In Session</Button></small>
            <br></br>
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
                <b>Recruiter: </b> John Doe
                <br></br>
                <br></br>
                <b>Status: </b> In session
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Position: </b> N/A </h7> 
            <h1></h1>
            <Button variant="outline-dark" size="sm">Join Queue</Button></small>
            <br></br>
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
                <b>Recruiter: </b> John Doe
                <br></br>
                <br></br>
                <b>Status: </b> Available
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Position: </b> 0 </h7> 
            <h1></h1>
            <Button variant="outline-success" size="sm">Join Now</Button></small>
            <br></br>
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
                <b>Recruiter: </b> John Doe
                <br></br>
                <br></br>
                <b>Status: </b> In session
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Position: </b> 2/10</h7> 
            <h1></h1>
            <Button variant="outline-secondary" size="sm">In Session</Button></small>
            <br></br>
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
                <b>Recruiter: </b> John Doe
                <br></br>
                <br></br>
                <b>Status: </b> In session
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Position: </b> N/A </h7> 
            <h1></h1>
            <Button variant="outline-dark" size="sm">Join Queue</Button></small>
            <br></br>
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
                <b>Recruiter: </b> John Doe
                <br></br>
                <br></br>
                <b>Status: </b> Available
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Position: </b> 0 </h7> 
            <h1></h1>
            <Button variant="outline-success" size="sm">Join Now</Button></small>
            <br></br>
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
                <b>Recruiter: </b> John Doe
                <br></br>
                <br></br>
                <b>Status: </b> In session
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Position: </b> 2/10</h7> 
            <h1></h1>
            <Button variant="outline-secondary" size="sm">In Session</Button></small>
            <br></br>
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
                <b>Recruiter: </b> John Doe
                <br></br>
                <br></br>
                <b>Status: </b> In session
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Position: </b> N/A </h7> 
            <h1></h1>
            <Button variant="outline-dark" size="sm">Join Queue</Button></small>
            <br></br>
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
                <b>Recruiter: </b> John Doe
                <br></br>
                <br></br>
                <b>Status: </b> Available
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Position: </b> 0 </h7> 
            <h1></h1>
            <Button variant="outline-success" size="sm">Join Now</Button></small>
            <br></br>
            </Card.Footer>
        </Card>
        </CardDeck>
      </div>
    );
  }
}
