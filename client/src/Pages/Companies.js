import React from "react";
import { Card, CardDeck, Button } from "react-bootstrap"; 
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

export const Companies = () => { 
    const fairs = ['Google', 'Microsoft', 'Facebook', 'Apple', 'Tesla', 'Snapchat', 'Qualcomm', 'Paypal', 'Netflix'];
    const items = []
  
    for (const [index, value] of fairs.entries()) {
      items.push(
          
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto"}}> 
                <Card.Img variant="top" src={google} height="200" />
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

      <>
        <CardDeck style={{ "width": "100%"}}>
            {items[0]}  {items[1]}  {items[2]}
        </CardDeck>
        <br></br>
        <CardDeck style={{ "width": "100%"}}>
            {items[3]}  {items[4]}  {items[5]}
        </CardDeck>
      </>
    );
    
  }
  
//   render(<Example />);
