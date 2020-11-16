import React from "react";
import profile from '../Images/profile.jpg'; 
import {Card, Table, Form, Button} from "react-bootstrap";
import google from '../Images/google.jpg'; 
import microsoft from '../Images/microsoft.jpg'; 
import facebook from '../Images/facebook.jpg'; 
import apple from '../Images/apple.jpg'; 
import tesla from '../Images/tesla.jpg'; 
import snapchat from '../Images/snapchat.jpg'; 
import qualcomm from '../Images/qualcomm.jpg'; 
import paypal from '../Images/paypal.jpg'; 
import netflix from '../Images/netflix.jpg'; 
import {MoreInfo} from './MoreInfo'

export default class RecruiterPastPage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
        <div style={{ "text-align": "center", "margin": "20px 20px" }}>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "margin-bottom": "20px"}}>
            <br></br>
            <h2><b>Past Career Fair: </b><b>Career Fair #2</b></h2>
            <br></br>
            <h5><b>Date: </b>Monday, October 26, 2020</h5>
            <br></br>
            <h5><b>Time: </b>11AM PST - 5PM PST</h5>
            <br></br>
            </Card>
            <Card style={{"padding": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <h2><b>Notes From Applicant Meetings</b></h2>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Interests</th>
                    <th style={{"width": "40%"}}>Notes</th>
                    <th>Resume</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Denise Wang</td>
                    <td>Full-time software engineering (frontend)</td>
                    <td>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </td>
                    <td><Button size="sm" variant="outline-dark" href="https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf">View Resume</Button></td>
                    </tr>
                    <tr>
                    <td>Siddharth Joshi</td>
                    <td>Full-time software engineering (backend)</td>
                    <td>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </td>
                    <td><Button size="sm" variant="outline-dark" href="https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf">View Resume</Button></td>
                    </tr>
                    <tr>
                    <td>Arnav Garg</td>
                    <td>Full-time software engineering (backend)</td>
                    <td>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </td>
                    <td><Button size="sm" variant="outline-dark" href="https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf">View Resume</Button></td>
                    </tr>
                    <tr>
                    <td>Denise Wang</td>
                    <td>Full-time software engineering (frontend)</td>
                    <td>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </td>
                    <td><Button size="sm" variant="outline-dark" href="https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf">View Resume</Button></td>
                    </tr>
                    <tr>
                    <td>Siddharth Joshi</td>
                    <td>Full-time software engineering (backend)</td>
                    <td>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </td>
                    <td><Button size="sm" variant="outline-dark" href="https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf">View Resume</Button></td>
                    </tr> 
                </tbody>
            </Table>
            </Card>
        </div>
    );
  }
}
