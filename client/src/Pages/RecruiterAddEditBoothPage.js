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
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Add New Booth">
                    <br></br>
                    <h2>Add New Booth at Harvey Mudd College Computer Science Fair</h2>
                    <Card style={{"margin-top": "20px"}}>
                        <div style={{"padding": "20px"}}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Company: </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                placeholder="Enter company name"
                                aria-label="Enter company name"
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>

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
                                <FormControl
                                placeholder="Year, i.e. Sophomores and Juniors"
                                aria-label="Year, i.e. Sophomores and Juniors"
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Requirements: </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
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
                            <Button variant="outline-primary">Save</Button>
                            </div>
                        </div>
                    </Card>
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    PROFILE
                </Tab>
                </Tabs>
            </Card>
      </div>
    );
  }
}
