import React from "react";
import {Button, Card, CardDeck} from "react-bootstrap";
import OrganizerLoginPage from "./OrganizerLoginPage"
import { Route, Switch } from "react-router-dom";
import { ExperienceInputForm } from "./ExperienceInputForm";

export default class StudentResumePage extends React.Component {

    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };

  render() {
    return (
    <div style={{"padding": "20px"}}>
        <Card style={{"margin": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <Card.Header> <h3>Experience</h3> </Card.Header>
            <Card.Body>
            <Card.Text>
                <h5>Software Engineer Intern at Google</h5>
                <h6>June 2020 - August 2020</h6>
                <h7>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h7>
                <br></br>
                <br></br>
                <h5>Software Engineer Intern at Microsoft</h5>
                <h6>June 2019 - August 2019</h6>
                <h7>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h7>
                <br></br>
                <br></br>
                <h5>Software Engineer Intern at Facebook</h5>
                <h6>June 2018 - August 2018</h6>
                <h7>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h7>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <ExperienceInputForm></ExperienceInputForm>
            </Card.Footer>
        </Card>
        <Card style={{"margin": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <Card.Header> <h3>Skills</h3> </Card.Header>
            <Card.Body>
            <Card.Text>
                This card has supporting text below as a natural lead-in to additional
                content.{' '}
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
    </div>
    
    );
  }
}


