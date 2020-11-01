import React from "react";
import { Row, Col, Container, Card, Button, CardGroup, Image} from "react-bootstrap";

export default class StudentLivePage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
      <div style={{ "background-color": "#84849A", color: "white", "text-align": "center", "height": "100vh" }}>
          HELLO
      </div>
    );
  }
}
