import React from "react";
import { Card, CardDeck, Button } from "react-bootstrap"; 

export const Fairs = () => { 
    // const handleRoute = routes => () => {
    //     this.props.history.push({ pathname: routes });
    //   };
    return (

      <>
        <CardDeck style={{ "width": "100%"}}>
                    <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "margin-bottom": "20px"}}>
                    <div style={{ "color": "black"}}>
                        <Card.Header><h3>Career Fair #1</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Status: </b> Open</Card.Title>
                        <Card.Text>
                            <p><b>Organizer: </b>UCLA</p>
                            <p><b>Date: </b>Today, October 25, 2020</p>
                            <p><b>Time: </b>Live Now, 11 PST - 3PM PST</p>
                        </Card.Text>
                        <Button variant="light">Register for this Career Fair</Button>
                        </Card.Body>
                        
                    </div>
                    </Card>
                    <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "margin-bottom": "20px"}}>
                    <div style={{ "color": "black"}}>
                        <Card.Header><h3>Career Fair #2</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Status: </b> Open</Card.Title>
                        <Card.Text>
                            <p><b>Organizer: </b>UCB</p>
                            <p><b>Date: </b>Monday, October 26, 2020</p>
                            <p><b>Time: </b> 11AM PST - 5PM PST</p>
                        </Card.Text>
                        <Button variant="light">Register for this Career Fair</Button>
                        </Card.Body>
                        
                    </div>
                    </Card>
                    <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "margin-bottom": "20px"}}>
                    <div style={{ "color": "black"}}>
                        <Card.Header><h3>Career Fair #3</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Status: </b> Open</Card.Title>
                        <Card.Text>
                            <p><b>Organizer: </b>UCSD</p>
                            <p><b>Date: </b>Tuesday, October 27, 2020</p>
                            <p><b>Time: </b>10AM PST - 3PM PST</p>
                        </Card.Text>
                        <Button variant="light">Register for this Career Fair</Button>
                        </Card.Body>
                        
                    </div>
                    </Card>
                </CardDeck>
                <br></br>
                <CardDeck>
                    <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "margin-bottom": "20px"}}>
                    <div style={{ "color": "black"}}>
                        <Card.Header><h3>Career Fair #4</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Status: </b> Open</Card.Title>
                        <Card.Text>
                            <p><b>Organizer: </b>UCSB</p>
                            <p><b>Date: </b>Today, October 25, 2020</p>
                            <p><b>Time: </b>Live Now, 11 PST - 3PM PST</p>
                        </Card.Text>
                        <Button variant="light">Register for this Career Fair</Button>
                        </Card.Body>
                        
                    </div>
                    </Card>
                    <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "margin-bottom": "20px"}}>
                    <div style={{ "color": "black"}}>
                        <Card.Header><h3>Career Fair #5</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Status: </b> Open</Card.Title>
                        <Card.Text>
                            <p><b>Organizer: </b>UCI</p>
                            <p><b>Date: </b>Monday, October 26, 2020</p>
                            <p><b>Time: </b> 11AM PST - 5PM PST</p>
                        </Card.Text>
                        <Button variant="light">Register for this Career Fair</Button>
                        </Card.Body>
                        
                    </div>
                    </Card>
                    <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "margin-bottom": "20px"}}>
                    <div style={{ "color": "black"}}>
                        <Card.Header><h3>Career Fair #6</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Status: </b> Closed</Card.Title>
                        <Card.Text>
                            <p><b>Organizer: </b>UCD</p>
                            <p><b>Date: </b>Tuesday, October 27, 2020</p>
                            <p><b>Time: </b>10AM PST - 3PM PST</p>
                        </Card.Text>
                        <Button variant="light">Register for this Career Fair</Button>
                        </Card.Body>
                        
                    </div>
                    </Card>
                </CardDeck>
      </>
    );
  }
  
//   render(<Example />);
