import React from "react";
import { Card, Button, CardGroup, Image, Form} from "react-bootstrap";

export default class StudentVideoCall extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
        <div style={{ "color": "black", "margin": "auto"}}>
        <div className="text-center" style={{ "color": "black", "padding": "20px"}}>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "padding": "20px"}}>
                <h2>Video Call With Student Applicant</h2> 
            </Card>
        </div>
        <div style={{ "color": "black", "padding": "20px"}}>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{"display": "inline", "margin": "auto"}}>
                    <div style={{"display": "inline-block"}}>
                        <video style={{ "margin": "20px"}} width="480" height="360" controls>
                            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"/>
                        </video>
                    </div>
                    <div style={{"display": "inline-block"}}>
                        <video style={{ "margin": "20px"}} width="480" height="360" controls>
                            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"/>
                        </video>
                    </div>
                </div>
                <Button style={{"margin": "auto", "width": "30%", "marginBottom": "20px"}} variant="outline-danger">End Call</Button>{' '}
            </Card>
        </div>
        </div>
    );
  }
}
