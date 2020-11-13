import React from "react";
import { Card, Button, CardGroup, Image} from "react-bootstrap";
import profile from '../Images/profile.jpg'; 

export default class OrganizerPage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
      <div style={{ "background-color": "white", color: "white", "text-align": "center" }}>
        <div style={{ "color": "black", "padding": "20px"}}>
            <Card className="text-center" style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <Card.Header><h1>Profile</h1></Card.Header>
                <Card.Body>
                    <Image src={profile} rounded height="150px"/>
                    <br></br>
                    <br></br>
                    <Card.Title>Company Name</Card.Title>
                                <Card.Text>
                                    <p> <b>Organizer Name: </b> University of California, Los Angeles (UCLA) </p>
                                    <p> <b>Organizer Description: </b> School within the UC system </p>
                                </Card.Text>
                        <Button variant="light" onClick={this.handleRoute("/createfair")}>Create New Career Fair</Button>
                </Card.Body>
                {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
            </Card>
        </div>
        <div style={{"padding": "20px", "color": "black"}}>
            <Card style={{"padding": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
               <Card.Header><h2><b>Live Career Fairs</b></h2></Card.Header>
                <p></p>
                    <Card style={{ "padding-bottom": "10px", "width": "50%", "margin": "auto"}} >
                        <Card.Header><h3>Career Fair #1</h3></Card.Header>
                        <Card.Body>
        
                        <Card.Text>
                            <p><b>Date: </b>Today, October 25, 2020</p>
                            <p><b>Time: </b>Live Now, 11 PST - 3PM PST</p>
                            <Button onClick={this.handleRoute("/orglive")} variant="outline-success">Observe Fair</Button>
                        </Card.Text>
                        </Card.Body>
                    </Card>
            </Card>
        </div>
        <div style={{"padding": "20px", "color": "black"}}>
            <Card style={{"padding": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
            <Card.Header><h2><b>Upcoming Career Fairs</b></h2></Card.Header>
                <CardGroup style={{ "width": "100%", "padding": "0 20px 20px 20px", "padding-top": "20px"}}>
                    <Card style={{ "padding-bottom": "5px"}}>
                        <Card.Header><h3>Career Fair #2</h3></Card.Header>
                        <Card.Body>
                        
                        <Card.Text>
                            <p><b>Date: </b>Thursday, November 5, 2020</p>
                            <p><b>Time: </b> 11 PST - 3PM PST</p>
                            <Button variant="outline-dark" onClick={this.handleRoute("/orgupcoming")}>Edit Fair</Button>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header><h3>Career Fair #3</h3></Card.Header>
                        <Card.Body>
                        
                        <Card.Text>
                            <p><b>Date: </b>Wednesday, November 11, 2020</p>
                            <p><b>Time: </b> 11AM PST - 5PM PST</p>
                            <Button variant="outline-dark" onClick={this.handleRoute("/orgupcoming")}>Edit Fair</Button>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header><h3>Career Fair #4</h3></Card.Header>
                        <Card.Body>
                        
                        <Card.Text>
                            <p><b>Date: </b>Tuesday, November 17, 2020</p>
                            <p><b>Time: </b>10AM PST - 3PM PST</p>
                            <Button variant="outline-dark" onClick={this.handleRoute("/orgupcoming")}>Edit Fair</Button>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Card>
            </div>
            
            <div style={{"padding": "20px", "color": "black"}}>
            <Card style={{"padding": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
            <Card.Header><h2><b>Past Career Fairs</b></h2></Card.Header>
                <CardGroup style={{ "width": "100%", "padding": "0 20px 20px 20px", "padding-top": "20px"}}>
                    <Card style={{ "padding-bottom": "5px"}}>
                        <Card.Header><h3>Career Fair #8</h3></Card.Header>
                        <Card.Body>
                   
                        <Card.Text>
                            <p><b>Date: </b>Thursday, November 5, 2020</p>
                            <p><b>Time: </b> 11 PST - 3PM PST</p>
                            <Button variant="outline-dark" onClick={this.handleRoute("/orgpast")}>View Fair History</Button>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header><h3>Career Fair #9</h3></Card.Header>
                        <Card.Body>
                 
                        <Card.Text>
                            <p><b>Date: </b>Wednesday, November 11, 2020</p>
                            <p><b>Time: </b> 11AM PST - 5PM PST</p>
                            <Button variant="outline-dark" onClick={this.handleRoute("/orgpast")}>View Fair History</Button>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header><h3>Career Fair #10</h3></Card.Header>
                        <Card.Body>
           
                        <Card.Text>
                            <p><b>Date: </b>Tuesday, November 17, 2020</p>
                            <p><b>Time: </b>10AM PST - 3PM PST</p>
                            <Button variant="outline-dark" onClick={this.handleRoute("/orgpast")}>View Fair History</Button>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Card>
            </div>
      </div>
    );
  }
}
