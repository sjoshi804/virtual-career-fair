import React from "react";
import {Button, Card, CardDeck} from "react-bootstrap";
import OrganizerLoginPage from "./OrganizerLoginPage"
import { Route, Switch } from "react-router-dom";
import { ExperienceInputForm } from "./ExperienceInputForm";
import { SkillsInputForm } from "./SkillsInputForm";
import { baseUrl, socketBaseUrl } from "../.config";

export default class StudentResumePage extends React.Component {

    constructor() {
        super();

        this.state = {
            skills: [],
            experiences: []
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
        console.log(resume)
        this.setState(
            {
            skills: resume.skills,
            experiences: resume.experiences || [],
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
                    <Card.Header><h3>Update Experience and Skills</h3></Card.Header>
                </Card>
                <Card style={{"margin": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                    <Card.Header> <h3>Experience</h3> </Card.Header>
                    <Card.Body>
                    {/* <Card.Text>
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
                        <h5>Software Engineer Intern at Apple</h5>
                        <h6>June 2018 - August 2018</h6>
                        <h7>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h7>
                    </Card.Text> */}
                    {experiences}
                    </Card.Body> 
                    <Card.Footer>
                    <ExperienceInputForm applicantId={this.props.match.params.applicantId} experiences={this.state.experiences}></ExperienceInputForm>
                    </Card.Footer>
                </Card>
                <Card style={{"margin": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                    <Card.Header> <h3>Skills</h3> </Card.Header>
                    <Card.Body>
                    <Card.Text>
                    <h6> { skills } </h6>
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <SkillsInputForm applicantId={this.props.match.params.applicantId} skills={skills}></SkillsInputForm>
                    </Card.Footer>
                </Card>
            </div>
        );
  }
}


