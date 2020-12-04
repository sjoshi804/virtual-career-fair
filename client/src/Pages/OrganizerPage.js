import React from "react";
import { Card, Button, CardGroup, Image} from "react-bootstrap";
import profile from '../Images/profile.jpg';
import { baseUrl } from '../.config';

export default class OrganizerPage extends React.Component {

    constructor(){
      super();

      this.state = {
        name: "",
        affiliatedOrganization: "",
        liveFairs: [],
        pastFairs: [],
        upcomingFairs: []
      }
    }

    // Return status of career fair
    getCareerFairStatus(startTime, endTime) {
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
        const queryUrl = baseUrl + "/organizer/" + emailId + "/";

        const organizer = await fetch(queryUrl, {
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

        if (organizer != undefined && 'name' in organizer) {
            this.setState({
                name: organizer.name,
                affiliatedOrganization: organizer.affiliatedOrganization,
                liveFairs: livefairs,
                pastFairs: pastfairs,
                upcomingFairs: upcomingfairs
            });
        }
        // Resolve to default values
        else {
          this.setState({
                name: "John Appleseed",
                affiliatedOrganization: "UCLA",
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

      var index = 1;

      // Past career fairs should have the lowest index number
      for (const careerfair of this.state.pastFairs) {
        past.push(
            <Card style={{ "padding-bottom": "10px", "width": "50%", "margin": "auto"}}>
                <Card.Header><h3>Career Fair {index}</h3></Card.Header>
                <Card.Body>
                <Card.Text>
                    <p><b>Start Time: </b>{new Date(careerfair.startTime).toString()}</p>
                    <p><b>End Time: </b>{new Date(careerfair.endTime).toString()}</p>
                    <Button variant="outline-dark" onClick={this.handleRoute("/organizer-past")}>View Details</Button>
                </Card.Text>
                </Card.Body>
            </Card>)
        index += 1;
      }
    
      // Live should have the greatest current index
      for (const careerfair of this.state.liveFairs) {
          live.push(
              <Card style={{ "padding-bottom": "10px", "width": "50%", "margin": "auto"}}>
                  <Card.Header><h3>Career Fair {index}</h3></Card.Header>
                  <Card.Body>
                  <Card.Text>
                      <p><b>Start Time: </b>{new Date(careerfair.startTime).toString()}</p>
                      <p><b>End Time: </b>{new Date(careerfair.endTime).toString()}</p>
                      <Button variant="outline-success" onClick={this.handleRoute("/organizer-live/" + careerfair._id)}>Join Now</Button>
                  </Card.Text>
                  </Card.Body>
              </Card>)
          index += 1;
      }
    
      // Since these are in the future, set their index to be > index of live
      for (const careerfair of this.state.upcomingFairs) {
          upcoming.push(
              <Card style={{ "padding-bottom": "10px", "width": "50%", "margin": "auto"}}>
                  <Card.Header><h3>Career Fair {index}</h3></Card.Header>
                  <Card.Body>
                  <Card.Text>
                      <p><b>Start Time: </b>{new Date(careerfair.startTime).toString()}</p>
                      <p><b>End Time: </b>{new Date(careerfair.endTime).toString()}</p>
                      <Button variant="outline-dark" onClick={this.handleRoute("/organizer-upcoming")}>View Details</Button>
                  </Card.Text>
                  </Card.Body>
              </Card>)
          index += 1  
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
                    <Card.Title>{this.state.affiliatedOrganization}</Card.Title>
                        <Card.Text>
                            <p> <b>Name: </b> {this.state.name} </p>
                        </Card.Text>
                    <Button variant="light" onClick={this.handleRoute("/createfair")}>Create New Career Fair</Button>
                </Card.Body>
            </Card>
        </div>

        <div style={{"padding": "20px", "color": "black"}}>
            <Card style={{"padding": "20px", "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
               <Card.Header><h2><b>Live Career Fairs</b></h2></Card.Header>
                <p></p>
                <CardGroup style={{ "width": "100%", "padding": "0 20px 20px 20px", "paddingTop": "20px"}}>
                    {live}
                </CardGroup>
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
    )
    
  }
}
