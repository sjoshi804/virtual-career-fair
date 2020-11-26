import React from "react";
import { Row, Col, Container, Card, Button, CardGroup, Image} from "react-bootstrap";
import profile from '../Images/profile.jpg'; 
// import profile from '../Images/profile.jpg'; 

export default class RecruiterVideoCall extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
        <div>
        <div style={{ "color": "black", "padding": "20px"}}>
            HELLO!!! DOES THIS WORK?!?!
        </div>
      </div>
    );
  }
}
