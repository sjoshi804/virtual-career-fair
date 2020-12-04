import React from "react";
import {Button, Card, CardDeck, FormControl} from "react-bootstrap";
import OrganizerLoginPage from "./OrganizerLoginPage"
import { Route, Switch } from "react-router-dom";
import { ExperienceInputForm } from "./ExperienceInputForm";
import { SkillsInputForm } from "./SkillsInputForm";
import { baseUrl, socketBaseUrl } from "../.config";

export default class RecruiterResumePage extends React.Component {

    constructor() {
        super();

        this.state = {
            skills: [],
            experiences: [],
            insights: []
        }
    }

    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };

    async componentDidMount() {
        const resume = await fetch(baseUrl + '/resume/' + this.props.match.params.applicantId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("Authorization") 
            }
        })
        .then(response => {
            if (response.status == 404 || response.status == 401) {
                return undefined;
            }
            else {
                return response.json()
            }
        });
        
        this.setState(
            {
            skills: resume.skills,
            experiences: resume.experiences || [],
            insights: resume.insights || []
            }
        );
    }

  render() {
    const skills = this.state.skills.join(', ');
    var experiences = [];
    for (let exp of this.state.experiences) {
        experiences.push(
            <Card.Text>
                <h5> Software Engineer at {exp.organization} </h5>
                <h6> {exp.startDate} - {exp.endDate} </h6>
                <h7> {exp.description} </h7>
                <br></br>
                <br></br>
            </Card.Text>
        )
    }
    return (
    <div style={{"padding": "20px"}}>
        <Card style={{"margin": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "padding": "20px", "text-align": "center"}}>
            <Card.Header><h3>Student Experience and Skills</h3></Card.Header>
        </Card>
        <Card style={{"margin": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <Card.Header> <h3>Experience</h3> </Card.Header>
            <Card.Body>
            {experiences}
            </Card.Body>
        </Card>
        <CardDeck style={{"margin": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
        <Card style={{"margin": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <Card.Header> <h3>Skills</h3> </Card.Header>
            <Card.Body>
            <Card.Text>
            <h6> { skills } </h6>
            </Card.Text>
            </Card.Body>
        </Card>
        <Card style={{"margin": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <Card.Header> <h3>Insights</h3> </Card.Header>
            <Card.Body>
            <Card.Text>
                <ul>
                    <li><b>Match: </b>{this.state.insights[0]}</li>
                    <li><b>Required Skills: </b>{this.state.insights[1]}</li>
                </ul>
            </Card.Text>
            </Card.Body>
        </Card>
        </CardDeck>
    </div>
    
    );
  }
}


