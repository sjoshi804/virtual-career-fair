import React from "react";
import { Row, Col, Container, Card, Button, CardGroup, Image} from "react-bootstrap";
import profile from '../Images/profile.jpg';
import { baseUrl } from "../.config";

export default class StudentProfilePage extends React.Component {
    
    constructor() {
        super();

        this.state = {
            name: "",
            major: "",
            graduationYear: "",
            affiliatedSchool: "",
            bio: "",
            liveFairs: [],
            pastFairs: [],
            upcomingFairs: []
        }
    }

    // Return status of career fair
    getCareerFairStatus(startTime, endTime){
        startTime = new Date(startTime);
        endTime = new Date(endTime);
        if (startTime < new Date() && endTime > new Date()){
            return "Live";
        } else if (endTime < new Date()) {
            return "Past";
        } else {
            return "Upcoming";
        }
    }

    async componentDidMount() {
        const emailId = localStorage.getItem("email");
        const queryUrl = baseUrl + "/applicant/" + emailId + "/";

        const user = await fetch(queryUrl, {
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

        var careerfairsData = [];
        careerfairsData = await fetch(baseUrl + "/careerfair", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("Authorization")
            }
        })
        .then(response => response.json());

        var livefairs = [];
        var pastfairs = [];
        var upcomingfairs = [];
        careerfairsData.forEach(careerfair => {
            var startTime = careerfair.startTime;
            var endTime = careerfair.endTime;
            const status = this.getCareerFairStatus(startTime, endTime);
            if (status == 'Live') {
                livefairs.push(careerfair);
            } else if (status == 'Past') {
                pastfairs.push(careerfair);
            } else {
                upcomingfairs.push(careerfair);
            }
        });
        
        if (user != undefined && 'name' in user) {
            this.setState({
                name: user.name,
                major: user.major,
                graduationYear: user.graduationYear,
                affiliatedSchool: user.affiliatedSchool,
                applicantId: user._id,
                bio: user.bio,
                liveFairs: livefairs,
                pastFairs: pastfairs,
                upcomingFairs: upcomingfairs
            });
        }
        // Resolve to default values
        else {
            this.setState({
                name: "Denise Wang",
                major: "Computer Science",
                graduationYear: "2021",
                affiliatedSchool: "UCLA",
                bio: "I am a graduating senior.",
                liveFairs: livefairs,
                pastFairs: pastfairs,
                upcomingFairs: upcomingfairs
            })
        }

    }
    
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        
    };
    
    render() {

    const live = [];
    const upcoming = [];
    const past = [];
  
    for (const careerfair of this.state.liveFairs) {
        live.push(
            <Card style={{ "padding-bottom": "10px", "width": "50%", "margin": "auto"}}>
                <Card.Header><h3>{careerfair.name}</h3></Card.Header>
                <Card.Body>
                <Card.Text>
                    <p><b>Start Time: </b>{new Date(careerfair.startTime).toString()}</p>
                    <p><b>End Time: </b>{new Date(careerfair.endTime).toString()}</p>
                    <Button variant="outline-success" onClick={this.handleRoute("/student-live/" + careerfair._id)}>Join Now</Button>
                </Card.Text>
                </Card.Body>
            </Card>)   
    }
  
    for (const careerfair of this.state.upcomingFairs) {
        upcoming.push(
            <Card style={{ "padding-bottom": "10px", "width": "50%", "margin": "auto"}}>
                <Card.Header><h3>{careerfair.name}</h3></Card.Header>
                <Card.Body>
                <Card.Text>
                    <p><b>Start Time: </b>{new Date(careerfair.startTime).toString()}</p>
                    <p><b>End Time: </b>{new Date(careerfair.endTime).toString()}</p>
                    <Button variant="outline-dark" onClick={this.handleRoute("/student-upcoming")}>View Details</Button>
                </Card.Text>
                </Card.Body>
            </Card>)   
    }
  
    for (const careerfair of this.state.pastFairs) {
        past.push(
            <Card style={{ "padding-bottom": "10px", "width": "50%", "margin": "auto"}}>
                <Card.Header><h3>{careerfair.name}</h3></Card.Header>
                <Card.Body>
                <Card.Text>
                    <p><b>Start Time: </b>{new Date(careerfair.startTime).toString()}</p>
                    <p><b>End Time: </b>{new Date(careerfair.endTime).toString()}</p>
                    <Button variant="outline-dark" onClick={this.handleRoute("/student-past")}>View Details</Button>
                </Card.Text>
                </Card.Body>
            </Card>)   
    }
    
    return (
      <div style={{ "background-color": "white", color: "white", "textAlign": "center" }}>
        <div style={{ "color": "black", "padding": "20px"}}>
            <Card className="text-center" style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <Card.Header><h1>Profile</h1></Card.Header>
                <Card.Body>
                    <Image src={profile} rounded height="150px"/>
                    <br></br>
                    <br></br>
                    <Card.Title>{this.state.name}</Card.Title>
                    <Card.Text>
                        <p> <b>Major: </b> {this.state.major} </p>
                        <p> <b>School: </b> {this.state.affiliatedSchool} </p>
                        <p> <b>Expected graduation: </b> {this.state.graduationYear} </p>
                        <p> <b>Summary:</b> {this.state.bio} </p>
                    </Card.Text>
                    {/* TODO: Student Resume Does Not Work / Not Incomplete */}
                    <Button variant="light" onClick={this.handleRoute("/student-resume/" + this.state.applicantId)}>View/Edit Resume</Button>
                </Card.Body>
                {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
            </Card>
        </div>
            <div style={{"padding": "20px", "color": "black"}}>
                <Card style={{"padding": "20px", "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
                <Card.Header><h2><b>Live Career Fairs</b></h2></Card.Header>
                    <p></p>
                        {live}
                </Card>
            </div>
            <div style={{"padding": "20px", "color": "black"}}>
                <Card style={{"padding": "20px", "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
                <Card.Header><h2><b>Upcoming Career Fairs</b></h2></Card.Header>
                    <CardGroup style={{ "width": "100%", "padding": "0 20px 20px 20px", "paddingTop": "20px"}}>
                        {upcoming}
                    </CardGroup>
                </Card>
            </div>
            <div style={{"padding": "20px", "color": "black"}}>
            <Card style={{"padding": "20px", "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
            <Card.Header><h2><b>Past Career Fairs Attended</b></h2></Card.Header>
                <CardGroup style={{ "width": "100%", "padding": "0 20px 20px 20px", "paddingTop": "20px"}}>
                    {past}
                </CardGroup>
            </Card>
            </div>
      </div>
    );
  }
}
