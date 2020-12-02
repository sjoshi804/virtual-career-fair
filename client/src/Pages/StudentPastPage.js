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

export default class StudentPastPage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    const companies = ['Netflix', 'Google', 'Snapchat', 'Qualcomm', 'Tesla', 'Microsoft', 'Facebook', 'Apple', 'Paypal'];
    const items = []
  
    for (const [index, value] of companies.entries()) {
      items.push(
          
        <Card style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto", "paddingTop": "10px"}}> 
                <Card.Img variant="top" src={netflix} />
                </div>
                <Card.Body>
                <Card.Title><b>{value}</b></Card.Title>
                <Card.Text>
                <p><b>Role: </b>Seeking software engineer interns.</p>
                <p></p>
                <p><b>Year: </b>Sophomores and Juniors. This internship is intended for students who are pursuing a Bachelor's degree program in Computer Science or a related field with an anticipated graduation date after December 2021, depending on their program and unique circumstances.</p>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <MoreInfo></MoreInfo>
                </Card.Footer>
            </Card>
      )
    }

    return (
        <div style={{ "textAlign": "center", "margin": "20px 20px" }}>
            <Card style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "marginBottom": "20px"}}>
            <br></br>
            <h2><b>Past Career Fair: </b><b>Career Fair #2</b></h2>
            <br></br>
            <h5><b>Date: </b>Monday, October 26, 2020</h5>
            <br></br>
            <h5><b>Time: </b>11AM PST - 5PM PST</h5>
            <br></br>
            </Card>
            <Card style={{"padding": "20px", "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <h2><b>Companies/Recruiters You Visited: </b></h2>
                <br></br>
                <CardDeck>
                {items[0]}  {items[1]}  {items[2]}
            </CardDeck>
            <br></br>
            <CardDeck>
                {items[6]}  {items[7]}  {items[8]}
            </CardDeck>
                <br></br>
            </Card>
            <Card style={{"padding": "20px", "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <h2><b>Companies That Attended: </b></h2>
                <br></br>
                <CardDeck>
                {items[0]}  {items[1]}  {items[2]}
            </CardDeck>
            <br></br>
            <CardDeck>
                {items[3]}  {items[4]}  {items[5]}
            </CardDeck>
            <br></br>
            <CardDeck>
                {items[6]}  {items[7]}  {items[8]}
            </CardDeck>
            </Card>
        </div>
    );
  }
}
