import React from "react";
import { Card, Button, InputGroup, FormControl} from "react-bootstrap";

export default class ManageFairPage extends React.Component {
    handleRoute = routes => () => {
        this.props.history.push({ pathname: routes });
      };

      render() {
        return (
          <div style={{ "textAlign": "center", "margin": "20px 20px" }}>
            <Card style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "marginBottom": "20px"}}>
                <Card.Body>
                    <br></br>
                    <h2><b>Career Fair #1</b></h2>
                    <br></br>
                    <h5><b>Date: </b>Today, October 25, 2020</h5>
                    <br></br>
                    <h5><b>Time: </b>Live Now, 11 PST - 3PM PST</h5>
                    <br></br>
                    <Button variant="light" onClick={this.handleRoute("/organizer-upcoming")}>Back to Upcoming Fairs</Button>
                </Card.Body>
            </Card>
            
                    <br></br>
                    <h2>Edit Career Fair # 1</h2>
                    <Card style={{"margin-top": "20px"}}>
                        <Card>
                        <Card.Body>
                            <Card.Title>Edit Date</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"><b>Current:</b> Today, October 25, 2020</Card.Subtitle>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">Edit Date of Career Fair</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type="date" aria-label="Edit Date of Career Fair" aria-describedby="inputGroup-sizing-sm" placeholder="date"/>
                            </InputGroup>
                            <Button variant="outline-primary">Save</Button>
                        </Card.Body>
                        </Card>

                        <Card>
                        <Card.Body>
                            <Card.Title>Edit Time</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"><b>Current:</b>Live Now, 11 PST - 3PM PST</Card.Subtitle>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">Edit Career Fair Time</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type="time" aria-label="Edit Career Fair Time" aria-describedby="inputGroup-sizing-sm" />
                            </InputGroup>
                            <Button variant="outline-primary">Save</Button>
                        </Card.Body>
                        </Card>

                        <Card>
                        <Card.Body>
                            <Card.Title>Edit Description</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"><b>Current: </b>Join us for a 12-14 week paid internship that offers personal and professional development, an executive speaker series, and community-building. The Software Engineering Internship program will give you an opportunity to work on complex computer science solutions, develop scalable, distributed software systems, and also collaborate on multitudes of smaller projects that have universal appeal.</Card.Subtitle>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text>Edit Description: </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" placeholder="Edit description" />
                            </InputGroup>
                            <Button variant="outline-primary">Save</Button>
                        </Card.Body>
                        </Card>
                    </Card>
                
          </div>
        );
  }
}

