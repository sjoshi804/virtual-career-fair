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
         RecruiterVideoCall} from "./Pages";


class Main extends React.Component {
  state = {
    searchText: ""
  };

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

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link onClick={this.handleRoute("/")}>JobZ</Nav.Link>
            <Nav.Link onClick={this.handleRoute("/student")}>Students</Nav.Link>
          </Nav>
          <Form inline>
            
            <Button onClick={this.handleRoute("/search")} variant="outline-info">
              Searching for Something Specific?
            </Button>
          </Form>
        </Navbar>
        <Switch>
      
            {/*Private Routes*/}
            <PrivateRoute path="/student" component={StudentProfilePage} redirectTo={"/student-login"} exact/>
            <PrivateRoute path="/student-live" component={StudentLivePage} redirectTo={"student-login"} exact/>
            <PrivateRoute path="/student-past" component={StudentPastPage} redirectTo={"student-login"} exact/>
            <PrivateRoute path="/student-upcoming" component={StudentUpcomingPage} redirectTo={"student-login"} exact/>

            <PrivateRoute path="/organizer" component={OrganizerPage} redirectTo={"/organizer-login"} exact/>
            <PrivateRoute path="/organizer-live" component={OrganizerLivePage} redirectTo={"/organizer-login"} exact/>
            <PrivateRoute path="/organizer-past" component={OrganizerPastPage} redirectTo={"/organizer-login"} exact/>
            <PrivateRoute path="/organizer-upcoming" component={OrganizerUpcomingPage} redirectTo={"/organizer-login"} exact/>
            <PrivateRoute path="/createfair" component={CreateFairPage} redirectTo={"/organizer-login"} exact/>
            <PrivateRoute path="/managefair" component={ManageFairPage} redirectTo={"/organizer-login"} exact/>

            <PrivateRoute path="/recruiter" component={RecruiterProfilePage} redirectTo={"/recruiter-login"} exact/>
            <PrivateRoute path="/recruiter-live" component={RecruiterLivePage} redirectTo={"/recruiter-login"} exact/>
            <PrivateRoute path="/recruiter-past" component={RecruiterPastPage} redirectTo={"/recruiter-login"} exact/>
            <PrivateRoute path="/add-edit-booth" component={RecruiterAddEditBoothPage} redirectTo={"/recruiter-login"} exact/>
            <PrivateRoute path="/recruiter-video-call" component={RecruiterVideoCall} redirectTo={"/recruiter-login"} exact/>

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
