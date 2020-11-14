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
    return (
        <div style={{ "text-align": "center", "margin": "20px 20px" }}>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "margin-bottom": "20px"}}>
            HELLO!!! DOES THIS WORK?!?! 
            </Card>
            <CardDeck>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto"}}> 
                <Card.Img variant="top" src={google} height="200" />
                </div>
                <Card.Body>
                <Card.Title><b>Google</b></Card.Title>
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
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
                <Card.Img variant="top" src={microsoft} height="200"/>
                </div>
                <Card.Body>
                <Card.Title><b>Microsoft</b></Card.Title>
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
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
                <Card.Img variant="top" src={facebook} height="200"/>
                </div>
                <Card.Body>
                <Card.Title><b>Facebook</b></Card.Title>
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
            </CardDeck>
            <br></br>
            <CardDeck>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "margin": "auto", "width": "300px"}}> 
                <Card.Img variant="top" src={apple} height="200px"/>
                </div>
                <Card.Body>
                <Card.Title><b>Apple</b></Card.Title>
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
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
                <Card.Img variant="top" src={tesla} height="200"/>
                </div>
                <Card.Body>
                <Card.Title><b>Tesla</b></Card.Title>
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
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
                <Card.Img variant="top" src={snapchat} height="200"/>
                </div>
                <Card.Body>
                <Card.Title><b>Snapchat</b></Card.Title>
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
            </CardDeck>
            <br></br>
            <CardDeck>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
                <Card.Img variant="top" src={qualcomm} height="200"/>
                </div>
                <Card.Body>
                <Card.Title><b>Qualcomm</b></Card.Title>
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
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
                <Card.Img variant="top" src={paypal} height="200"/>
                </div>
                <Card.Body>
                <Card.Title><b>PayPal</b></Card.Title>
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
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
                <Card.Img variant="top" src={netflix} />
                </div>
                <Card.Body>
                <Card.Title><b>Netflix</b></Card.Title>
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
            </CardDeck>
        </div>
    );
  }
}
