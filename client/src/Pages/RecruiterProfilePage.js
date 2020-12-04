import React from "react";
import { Row, Col, Container, Card, Button, CardGroup, Image} from "react-bootstrap";
import profile from '../Images/profile.jpg'; 
import { baseUrl } from '../.config';

export default class RecruiterProfilePage extends React.Component {
    
    constructor(){
      super();

      this.state = {
        name: "",
        company: "",
        jobTitle: "",
        yearsOfExperience: "",
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
        const queryUrl = baseUrl + "/recruiter/" + emailId + "/";

        const recruiter = await fetch(queryUrl, {
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

        if (recruiter != undefined && 'name' in recruiter) {
            this.setState({
              name: recruiter.name,
              company: recruiter.company,
              jobTitle: recruiter.jobTitle,
              yearsOfExperience: recruiter.yearsOfExperience,
              liveFairs: livefairs,
              pastFairs: pastfairs,
              upcomingFairs: upcomingfairs
            });
        } 
        // Resolve to default values
        else {
            this.setState({
              name: "John Doe",
              company: "Google",
              jobTitle: "Software Engineer",
              yearsOfExperience: "5",
              liveFairs: livefairs,
              pastFairs: pastfairs,
              upcomingFairs: upcomingfairs
            });
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
                      <Button variant="outline-success" onClick={this.handleRoute("/recruiter-live/" + careerfair._id + "/" + this.state.company)}>Join Now</Button>
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
                      <Button variant="outline-dark" onClick={this.handleRoute("/recruiter-upcoming")}>View Details</Button>
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
                      <Button variant="outline-dark" onClick={this.handleRoute("/recruiter-past")}>View Details</Button>
                  </Card.Text>
                  </Card.Body>
              </Card>)   
      }

    return (
        <div style={{ "background-color": "white", color: "white", "textAlign": "center" }}>
        <div style={{ "color": "black", "padding": "20px"}}>
            <Card className="text-center" style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <Card.Header><h2>Profile</h2></Card.Header>
                <Card.Body>
                    <Image src={profile} rounded height="150px"/>
                    <br></br>
                    <br></br>
                    <Card.Title>{this.state.name}</Card.Title>
                    <Card.Text>
                        <p> <b>Company: </b>{this.state.company}</p>
                        <p> <b>Position: </b>{this.state.jobTitle}</p>
                        <p> <b>Years Of Experience: </b>{this.state.yearsOfExperience}</p>
                    </Card.Text>
                </Card.Body>
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
            <Card.Header><h2><b>Past Career Fairs</b></h2></Card.Header>
                <CardGroup style={{ "width": "100%", "padding": "0 20px 20px 20px", "paddingTop": "20px"}}>
                    {past}
                </CardGroup>
            </Card>
            </div>
      </div>
    );
  }
}
