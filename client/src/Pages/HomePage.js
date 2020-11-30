import React from "react";
import {Button} from "react-bootstrap";
import OrganizerLoginPage from "./OrganizerLoginPage"
import { Route, Switch } from "react-router-dom";

export default class HomePage extends React.Component {

    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };

  render() {
    return (
    <div>
      
      <div style={{padding: "100px", "text-align": "center", background: "white", "color": "black"}}>
        <h1>JobZ</h1>
        <p>
          <h4>
            A virtual career for students, recruiters, and organizers.
          </h4>
        </p>
      </div>
      
      <div style={{padding: "100px", "text-align": "center", background: "#84849A", "color": "white"}}>
        <h1>STUDENTS</h1>
        <p>
          <h4>
            Students can upload their resumes, search and attend career fairs, and join interviews with recruiters.
          </h4>
        </p>
        <Button onClick={this.handleRoute("/student-login")} variant="light">Get Started</Button>
      </div>
      
      <div style={{padding: "100px", "text-align": "center", background: "#75758D", "color": "white"}}>
        <h1>RECRUITERS</h1>
        <p>
          <h4>
            Recruiters can add or add jobs they make available through the fair once the organizer grants the company access. Once  the  event  is  live,  recruiters  can  see  all  the  students and their resumes in  the  company  queue  and join meetings with them.
          </h4>
        </p>
        <Button onClick={this.handleRoute("/recruiter-login")} variant="light">Get Started</Button>
      </div>
      
      <div style={{padding: "100px", "text-align": "center", background: "#666681", "color": "white"}}>
        <h1>ORGANIZERS</h1>
        <p>
          <h4>
            Organizers view their live, upcoming, or past career fairs. They can edit existing careers fairs or create a new career fair by filling out a form with details for the event.
          </h4>
        </p>
        <Button variant="light" onClick={this.handleRoute("/organizer-login")}>Get Started</Button>
      </div>

    </div>
    
    );
  }
}


