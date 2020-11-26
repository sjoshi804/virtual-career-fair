import React from "react";
import { Row, Col, Container, Card, Button, CardGroup, Image} from "react-bootstrap";

export default class RecruiterVideoCall extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
        <div style={{ "color": "black", "margin": "auto"}}>
            <video style={{ "margin": "20px"}} width="480" height="360" controls>
                <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"/>
            </video>
            <video style={{ "margin": "20px"}} width="480" height="360" controls>
                <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"/>
            </video>
        </div>
    );
  }
}
