import React from "react";
import { Row, Col, Container, Card, Button, CardGroup, Image} from "react-bootstrap";
import profile from '../Images/profile.jpg'; 
// import profile from '../Images/profile.jpg'; 

export default class StudentLoginPage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
        <div>
            HELLO! DOES THIS WORK?!
        </div>
    );
  }
}
