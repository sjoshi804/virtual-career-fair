import React from "react";
import {Button, Card, CardDeck, FormControl} from "react-bootstrap";
import OrganizerLoginPage from "./OrganizerLoginPage"
import { Route, Switch } from "react-router-dom";
import { ExperienceInputForm } from "./ExperienceInputForm";
import { SkillsInputForm } from "./SkillsInputForm";

export default class RecruiterResumePage extends React.Component {

    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };

    // async componentDidMount() {
    //     // TODO: Optimize this with pagination etc., #jobs and career fairs can grow very quickly and will make this page store too much data
    //     // TODO: Update url to be set dynamically based on prod/dev otherwise may have issues in deployment with this
    
    //     // Get all companies
    //     const resume = await fetch(baseUrl + '/resume' + this.props.match.applicantId, {
    //         method: "GET"
    //     })
    //     .then(response => response.json());
    
    //     // Get all jobs - by looping through every company
    //     // var jobs = [];
    //     // for (let company of companies) {
    //     //     var jobsAtCompany = await fetch(baseUrl + '/company/' + company._id + "/job", {
    //     //         method: "GET"
    //     //     })
    //     //     .then(response => response.json());
            
    //     //     jobsAtCompany.forEach(job => {
    //     //         job.company = company.name;
    //     //         jobs.push(job);
    //     //     });
    //     // }
    
    //     // const fairs = await fetch(baseUrl + '/careerfair',
    //     // {
    //     //     method: "GET"
    //     // })
    //     // .then(response => response.json());
    
    //     this.setState(
    //         {
    //         companies: resume.insights,
            
    //         }
    //     );
    //     }

  render() {
    return (
    <div style={{"padding": "20px"}}>
        <Card style={{"margin": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "padding": "20px", "text-align": "center"}}>
            <Card.Header><h3>Student Experience and Skills</h3></Card.Header>
        </Card>
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
                <h5>Software Engineer Intern at Apple</h5>
                <h6>June 2018 - August 2018</h6>
                <h7>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h7>
            </Card.Text>
            </Card.Body>
        </Card>
        <CardDeck style={{"margin": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
        <Card style={{"margin": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <Card.Header> <h3>Skills</h3> </Card.Header>
            <Card.Body>
            <Card.Text>
            <h6><b>Coding:</b> C/C++, Java, x86 assembly, C#, PHP, Javascript, HTML, CSS, SML, Ruby, Perl</h6>
            <br></br>
            <h6><b>Technologies/Environment:</b> Windows, Win32 API/GUI, Linux, MySQL, OpenGL, ASP.NET</h6>
            </Card.Text>
            </Card.Body>
        </Card>
        <Card style={{"margin": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <Card.Header> <h3>Notes</h3> </Card.Header>
            <Card.Body>
            <Card.Text>
            <FormControl as="textarea" aria-label="With textarea" />
            <br></br>
            <Button variant="outline-dark">Save</Button>
            </Card.Text>
            </Card.Body>
        </Card>
        </CardDeck>
    </div>
    
    );
  }
}


