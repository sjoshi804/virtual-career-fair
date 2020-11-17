import React from "react";
import { Card, CardDeck, Button } from "react-bootstrap"; 

export const Positions = () => { 
    return (
      <>
        <CardDeck>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto"}}> 
               
                </div>
                <Card.Body>
                <Card.Title>Software Engineer for Google</Card.Title>
                <Card.Text>
                    <br></br>
                    <b>Recruiter: </b> John Doe
                    <br></br>
                    <br></br>
                    <b>Status: </b> In session
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Students in Queue: </b> 15 </h7> 
                <h1></h1>
                <Button variant="outline-secondary" size="sm">Join Booth</Button></small>
                <br></br>
                </Card.Footer>
            </Card>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
                
                </div>
                <Card.Body>
                <Card.Title>Frontend developer for Microsoft</Card.Title>
                <Card.Text>
                    <br></br>
                    <b>Recruiter: </b> John Doe
                    <br></br>
                    <br></br>
                    <b>Status: </b> In session
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Students in Queue: </b> 15 </h7> 
                <h1></h1>
                <Button variant="outline-dark" size="sm">Join Booth</Button></small>
                <br></br>
                </Card.Footer>
            </Card>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
                
                </div>
                <Card.Body>
                <Card.Title>Backend developer for Facebook</Card.Title>
                <Card.Text>
                    <br></br>
                    <b>Recruiter: </b> John Doe
                    <br></br>
                    <br></br>
                    <b>Status: </b> Available
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Students in Queue: </b> 15 </h7> 
                <h1></h1>
                <Button variant="outline-success" size="sm">Join Booth</Button></small>
                <br></br>
                </Card.Footer>
            </Card>
            </CardDeck>
            <br></br>
            <CardDeck>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "margin": "auto", "width": "300px"}}> 
                
                </div>
                <Card.Body>
                <Card.Title>Marketing for Apple</Card.Title>
                <Card.Text>
                    <br></br>
                    <b>Recruiter: </b> John Doe
                    <br></br>
                    <br></br>
                    <b>Status: </b> In session
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Students in Queue: </b> 1</h7> 
                <h1></h1>
                <Button variant="outline-secondary" size="sm">Join Booth</Button></small>
                <br></br>
                </Card.Footer>
            </Card>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
                
                </div>
                <Card.Body>
                <Card.Title>UI/UX for Tesla</Card.Title>
                <Card.Text>
                    <br></br>
                    <b>Recruiter: </b> John Doe
                    <br></br>
                    <br></br>
                    <b>Status: </b> In session
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Students in Queue: </b> 404 </h7> 
                <h1></h1>
                <Button variant="outline-dark" size="sm">Join Booth</Button></small>
                <br></br>
                </Card.Footer>
            </Card>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
                
                </div>
                <Card.Body>
                <Card.Title>AI deveopment for Snapchat</Card.Title>
                <Card.Text>
                    <br></br>
                    <b>Recruiter: </b> John Doe
                    <br></br>
                    <br></br>
                    <b>Status: </b> Available
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Students in Queue: </b> 15 </h7> 
                <h1></h1>
                <Button variant="outline-success" size="sm">Join Booth</Button></small>
                <br></br>
                </Card.Footer>
            </Card>
            </CardDeck>
      </>
    );
  }
  
//   render(<Example />);
