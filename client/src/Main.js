import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { PrivateRoute } from "./PrivateRoute"

import { StudentProfilePage,
         HomePage,
         RouteNotFound,
         StudentLivePage,
         RecruiterProfilePage,
         ManageFairPage,
         CreateFairPage,
         OrganizerPage,
         OrganizerLivePage,
         OrganizerPastPage,
         OrganizerUpcomingPage,
         OrganizerLoginPage,
         RecruiterAddEditBoothPage,
         RecruiterLivePage,
         StudentUpcomingPage,
         SearchPage,
         StudentPastPage,
         RecruiterPastPage,
         StudentLoginPage,
         RecruiterLoginPage,
         RecruiterVideoCall,
         StudentVideoCall,
         StudentResumePage, 
         RecruiterResumePage, } from "./Pages";

class Main extends React.Component {

  constructor(props)
  {
    super(props);
    this.logout = this.logout.bind(this);
  }


  handleRoute = route => () => {
    this.props.history.push({ pathname: route });
  };

  handleSearchInput = event => {
    this.setState({
      searchText: event.target.value
    });
  };

  handleSearchSubmit = () => {
    if (this.state.searchText) {
      this.props.history.push({
        pathname: "/results",
        state: {
          searchText: this.state.searchText
        }
      });
    } else {
      alert("Please enter some search text!");
    }
  };

  logout()
  {
    // Delete auth token to log out
    localStorage.removeItem("Authorization");
    this.handleRoute("/")();
  }

  render() {
    return (
      <>
        <Navbar bg="black" variant="light" stick="top">
          <Nav className="mr-auto">
            <Nav.Link onClick={this.handleRoute("/")}>JobZ</Nav.Link>
            <Nav.Link onClick={this.handleRoute("/student")}>Students</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link onClick={this.handleRoute("/search")}>
              Searching for Something Specific?
            </Nav.Link>
          
            {
              localStorage.getItem("Authorization") != undefined ? <Nav.Link onClick={this.logout}>Sign Out</Nav.Link> : <Nav.Link onClick={this.handleRoute("/student-login")}>Sign In</Nav.Link>
            }
        </Nav>
        </Navbar>
        <Switch>
      
            {/*Private Routes*/}
            <PrivateRoute path="/student" component={StudentProfilePage} redirectTo={"/student-login"} exact/>
            <PrivateRoute path="/student-live/:careerFairId" component={StudentLivePage} redirectTo={"student-login"}/>
            <PrivateRoute path="/student-past" component={StudentPastPage} redirectTo={"student-login"} exact/>
            <PrivateRoute path="/student-upcoming" component={StudentUpcomingPage} redirectTo={"student-login"} exact/>
            <PrivateRoute path="/student-video-call/:careerFairId/:recruiterId" component={StudentVideoCall} />
            <PrivateRoute path="/student-resume" component={StudentResumePage} redirectTo={"/student-login"} exact/>
            <PrivateRoute path="/organizer" component={OrganizerPage} redirectTo={"/organizer-login"} exact/>
            <PrivateRoute path="/organizer-live/:careerFairId" component={OrganizerLivePage} redirectTo={"/organizer-login"}/>
            <PrivateRoute path="/organizer-past" component={OrganizerPastPage} redirectTo={"/organizer-login"} exact/>
            <PrivateRoute path="/organizer-upcoming" component={OrganizerUpcomingPage} redirectTo={"/organizer-login"} exact/>
            <PrivateRoute path="/createfair" component={CreateFairPage} redirectTo={"/organizer-login"} exact/>
            <PrivateRoute path="/managefair" component={ManageFairPage} redirectTo={"/organizer-login"} exact/>

            <PrivateRoute path="/recruiter" component={RecruiterProfilePage} redirectTo={"/recruiter-login"} exact/>
            <PrivateRoute path="/recruiter-live/:careerFairId/:companyName" component={RecruiterLivePage} redirectTo={"/recruiter-login"}/>
            <PrivateRoute path="/recruiter-past" component={RecruiterPastPage} redirectTo={"/recruiter-login"} exact/>
            <PrivateRoute path="/add-edit-booth" component={RecruiterAddEditBoothPage} redirectTo={"/recruiter-login"} exact/>
            <PrivateRoute path="/recruiter-video-call/:careerFairId/:companyId/:applicantId/:applicantPeerJsId/:companyName" component={RecruiterVideoCall} redirectTo={"/recruiter-login"} exact/>

            <PrivateRoute path="/recruiter-resume/:applicantId" component={RecruiterResumePage} redirectTo={"/recruiter-login"}/>

            {/*Public Routes*/}
            <Route path="/" component={HomePage} exact/>
            <Route path="/search" component={SearchPage} exact/>
            <Route path="/student-login" component={StudentLoginPage} exact/>
            <Route path="/recruiter-login" component={RecruiterLoginPage} exact/>
            <Route path="/organizer-login" component={OrganizerLoginPage} exact/>

            {/*Redirect on any incorrect URL*/}
            <Route component={RouteNotFound} />

        </Switch>
      </>
    );
  }
}

export default withRouter(Main);
