import React from "react";
import { Row, Col, Container, Card, Button, CardGroup, Image} from "react-bootstrap";

export default class OrganizerPage extends React.Component {
    handleroute = routes => () => {
        this.props.history.push({ pathname: routes });
      };

  render() {
    return (
      <div style={{ "background-color": "#84849A", color: "white", "text-align": "center", "height": "100vh" }}>
        {/* <h1>Organizer</h1> */}
        <Container>
            <Row>
                <Col>
                    <div style={{ "color": "black"}}>
                        <Card className="text-center">
                            <Card.Header><h1>Profile</h1></Card.Header>
                            <Card.Body>
                                <Image src="holder.js/171x180" rounded/>
                                <Card.Title>Company Name</Card.Title>
                                <Card.Text>
                                    <p> <b>Organizer Name: </b> University of California, Los Angeles (UCLA) </p>
                                    <p> <b>Organizer Description: </b> School within the UC system </p>
                                </Card.Text>
                                <Button variant="light" onClick={this.handleroute("/createfair")}>Create New Career Fair</Button>
                            </Card.Body>
                            {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
                        </Card>
                    </div>
                </Col>
                {/* <Col style={{ "border-style": "solid"}}>
                    Resume
                </Col> */}
            </Row>
            <Row>
                <CardGroup style={{ "width": "100%"}}>
                    <Card>
                    <div style={{ "color": "black"}}>
                        <Card.Header><h3>Career Fair #1</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Status: </b> Open</Card.Title>
                        <Card.Text>
                            <p><b>Date: </b>Today, October 25, 2020</p>
                            <p><b>Time: </b>Live Now, 11 PST - 3PM PST</p>
                        </Card.Text>
                        </Card.Body>
                        <Button variant="light" onClick={this.handleroute("/managefair")}>Manage</Button>
                    </div>
                    </Card>
                    <Card>
                    <div style={{ "color": "black"}}>
                        <Card.Header><h3>Career Fair #2</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Status: </b> Open</Card.Title>
                        <Card.Text>
                            <p><b>Date: </b>Monday, October 26, 2020</p>
                            <p><b>Time: </b> 11AM PST - 5PM PST</p>
                        </Card.Text>
                        </Card.Body>
                        <Button variant="light">Manage</Button>
                    </div>
                    </Card>
                    <Card>
                    <div style={{ "color": "black"}}>
                        <Card.Header><h3>Career Fair #3</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Status: </b> Closed</Card.Title>
                        <Card.Text>
                            <p><b>Date: </b>Tuesday, October 27, 2020</p>
                            <p><b>Time: </b>10AM PST - 3PM PST</p>
                        </Card.Text>
                        </Card.Body>
                        <Button variant="light">View Event History</Button>
                    </div>
                    </Card>
                </CardGroup>
            </Row>
        </Container>
      </div>
    );
  }
}
