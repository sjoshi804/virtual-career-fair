import React from "react";
import { Tab, Tabs, Card, Button, InputGroup, FormControl} from "react-bootstrap";
import profile from '../Images/profile.jpg'; 
// import profile from '../Images/profile.jpg'; 

export default class RecruiterAddEditBoothPage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
        <div style={{"padding": "20px"}}>
            <Card style={{"box-shadow": "8px 4px 8px 4px rgba(0,0,0,0.2)", "padding": "20px"}}>
                <Tabs defaultActiveKey="add" id="uncontrolled-tab-example">
                <Tab eventKey="add" title="Add New Booth">
                    <br></br>
                    <h2>Add New Booth at Harvey Mudd College Computer Science Fair</h2>
                    <Card style={{"margin-top": "20px"}}>
                        <div style={{"padding": "20px"}}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Role(s): </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                placeholder="Position, i.e. Software engineer (internship, June 2021)"
                                aria-label="Position, i.e. Software engineer (internship, June 2021)"
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Target Year(s): </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea"
                                placeholder="Year, i.e. Sophomores and Juniors"
                                aria-label="Year, i.e. Sophomores and Juniors"
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Requirements: </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea"
                                placeholder="Requirements, i.e. Computer Science/Engineering Majors"
                                aria-label="Requirements, i.e. Computer Science/Engineering Majors"
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>

                            <InputGroup>
                                <InputGroup.Prepend>
                                <InputGroup.Text>Description: </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" aria-label="With textarea" placeholder="Enter additional details" />
                            </InputGroup>
                            <div style={{"margin": "auto", "width": "50px", "padding-top": "15px"}}>
                            <Button variant="outline-primary" onClick={this.handleRoute("/recruiter")}>Save</Button>
                            </div>
                        </div>
                    </Card>
                </Tab>
                <Tab eventKey="edit" title="Edit Existing Booth">
                    <br></br>
                    <h2>Edit Existing Booth at Harvey Mudd College Computer Science Fair</h2>
                    <Card style={{"margin-top": "20px"}}>
                        <Card>
                        <Card.Body>
                            <Card.Title>Edit Role(s)</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"><b>Current:</b> Seeking software engineer interns.</Card.Subtitle>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">Edit Role(s)</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-label="Edit role(s)" aria-describedby="inputGroup-sizing-sm" />
                            </InputGroup>
                            <Button variant="outline-primary" onClick={this.handleRoute("/recruiter")}>Save</Button>
                        </Card.Body>
                        </Card>

                        <Card>
                        <Card.Body>
                            <Card.Title>Edit Target Year(s)</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"><b>Current:</b> Sophomores and Juniors. This internship is intended for students who are pursuing a Bachelor's degree program in Computer Science or a related field with an anticipated graduation date after December 2021, depending on their program and unique circumstances.</Card.Subtitle>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">Edit Target Year(s)</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" aria-label="Edit target year(s)" aria-describedby="inputGroup-sizing-sm" />
                            </InputGroup>
                            <Button variant="outline-primary" onClick={this.handleRoute("/recruiter")}>Save</Button>
                        </Card.Body>
                        </Card>

                        <Card>
                        <Card.Body>
                            <Card.Title>Edit Requirements</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"><b>Current: </b> • Pursuing a Bachelor's degree program or post secondary or training experience with a focus on subjects in software development or other technical related field.
                                • Experience in Software Development and coding in a general purpose programming language.
                                • Experience coding in two or more of C, C++, Java, JavaScript, Python, or similar.</Card.Subtitle>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">Edit Requirement(s)</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" aria-label="Edit requirement(s)" aria-describedby="inputGroup-sizing-sm" />
                            </InputGroup>
                            <Button variant="outline-primary" onClick={this.handleRoute("/recruiter")}>Save</Button>
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
                            <Button variant="outline-primary" onClick={this.handleRoute("/recruiter")}>Save</Button>
                        </Card.Body>
                        </Card>
                    </Card>
                </Tab>
                </Tabs>
            </Card>
      </div>
    );
  }
}
