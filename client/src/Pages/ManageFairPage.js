import React from "react";
import { Row, Col, Container, Card, Button, CardGroup, Image} from "react-bootstrap";

export default class ManageFairPage extends React.Component {
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
                            <Card.Header><h1>Career Fair #1</h1></Card.Header>
                            <Card.Body>
                                <Image src="holder.js/171x180" rounded/>
                                <Card.Title>Organizer: UCLA</Card.Title>
                                <Card.Text>
                                    <p> <b>Career Fair Descriptions: </b> Open for UCLA students, recruiters are welcome to create booths for their companies. </p>
                                </Card.Text>
                                <Button variant="light" onClick={this.handleroute("/org")}>End Career Fair</Button>
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
                        <Card.Header><h3>Job Booth for some Company</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Recruiter: </b> Company or Recruiter name</Card.Title>
                        <Card.Text>
                            <p><b>Status: </b>Open</p>
                            <p><b>Date: </b>Today, October 25, 2020</p>
                            <p><b>Time: </b>Live Now, 11 PST - 3PM PST</p>
                        </Card.Text>
                        </Card.Body>
                        <Button variant="light">Close Booth</Button>
                    </div>
                    </Card>
                    <Card>
                    <div style={{ "color": "black"}}>
                        <Card.Header><h3>Job Booth for some other Company</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Recruiter: </b> Company or Recruiter name</Card.Title>
                        <Card.Text>
                            <p><b>Status: </b>Open</p>
                            <p><b>Date: </b>Today, October 25, 2020</p>
                            <p><b>Time: </b>Live Now, 11 PST - 3PM PST</p>
                        </Card.Text>
                        </Card.Body>
                        <Button variant="light">Close Booth</Button>
                    </div>
                    </Card>
                    <Card>
                    <div style={{ "color": "black"}}>
                        <Card.Header><h3>Job Booth for one more Company</h3></Card.Header>
                        <Card.Body>
                        <Card.Title><b>Recruiter: </b> Company or Recruiter name</Card.Title>
                        <Card.Text>
                            <p><b>Status: </b>Closed</p>
                            <p><b>Date: </b>Today, October 25, 2020</p>
                            <p><b>Time: </b>11 PST - 3PM PST</p>
                        </Card.Text>
                        </Card.Body>
                        <Button variant="light">IDK yet</Button>
                    </div>
                    </Card>
                </CardGroup>
            </Row>
        </Container>
      </div>
    );
  }
}
