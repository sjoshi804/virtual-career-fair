import React from "react";
import profile from '../Images/profile.jpg'; 
import {Card, CardDeck, Button} from "react-bootstrap";
import google from '../Images/google.jpg'; 
import microsoft from '../Images/microsoft.jpg'; 
import facebook from '../Images/facebook.jpg'; 
import apple from '../Images/apple.jpg'; 
import tesla from '../Images/tesla.jpg'; 
import snapchat from '../Images/snapchat.jpg'; 
import qualcomm from '../Images/qualcomm.jpg'; 
import paypal from '../Images/paypal.jpg'; 
import netflix from '../Images/netflix.jpg'; 
import {MoreInfo} from './MoreInfo'

export default class RecruiterPastPage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
        <div style={{ "text-align": "center", "margin": "20px 20px" }}>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "margin-bottom": "20px"}}>
            <br></br>
            <h2><b>Past Career Fair: </b><b>Career Fair #2</b></h2>
            <br></br>
            <h5><b>Date: </b>Monday, October 26, 2020</h5>
            <br></br>
            <h5><b>Time: </b>11AM PST - 5PM PST</h5>
            <br></br>
            </Card>
            <Card style={{"padding": "20px", "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            HELLO?!!! DOES THIS WORK?!?!
            </Card>
        </div>
    );
  }
}
