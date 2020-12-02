import React from "react";
import {Button} from "react-bootstrap";
import OrganizerLoginPage from "./OrganizerLoginPage"
import { Route, Switch } from "react-router-dom";

export default class StudentResumePage extends React.Component {

    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };

  render() {
    return (
    <div>
    HELLO?!?! DOES THIS WORK!
    </div>
    
    );
  }
}


