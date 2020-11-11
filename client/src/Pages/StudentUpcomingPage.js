import React from "react";
import { Tab, Tabs, Card, Button, InputGroup, FormControl} from "react-bootstrap";
import profile from '../Images/profile.jpg'; 
// import profile from '../Images/profile.jpg'; 

export default class StudentUpcomingPage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
        <div style={{"padding": "20px"}}>
            Hello!!! Does this work?!
        </div>
    );
  }
}
