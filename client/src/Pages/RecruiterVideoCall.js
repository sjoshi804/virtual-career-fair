import React from "react";
import { Card, Button, CardGroup, Image, Form} from "react-bootstrap";

export default class RecruiterVideoCall extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
        <div style={{ "color": "black", "margin": "auto"}}>
        <div className="text-center" style={{ "color": "black", "padding": "20px"}}>
            <Card style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "padding": "20px"}}>
                <h2>Video Call With Student Applicant</h2> 
            </Card>
        </div>
        <div style={{ "color": "black", "padding": "20px"}}>
            <Card style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{"display": "inline"}}>
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
            </Card>
        </div>
        <div className="text-center" style={{ "color": "black", "padding": "20px"}}>
            <Card style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "padding": "20px"}}>
                <h2>Notes</h2>
                <Form.Group style={{"width": "80%", "margin": "auto"}} controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={6} />
                </Form.Group>
                <Button size="sm" variant="outline-dark" style={{"width": "50px", "margin": "auto", "marginTop": "20px" }}>Save</Button>  
            </Card>
        </div>
        </div>
    );
  }
}
