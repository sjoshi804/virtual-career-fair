import React from "react";
// import { Row, Col, Container, Card, Button, CardGroup, Image} from "react-bootstrap";
// import profile from '../Images/profile.jpg'; 

export default class RecruiterProfilePage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
      <div style={{ "background-color": "white", color: "white", "text-align": "center", "color": "black" }}>
       HELLO!!!
      </div>
    );
  }
}
