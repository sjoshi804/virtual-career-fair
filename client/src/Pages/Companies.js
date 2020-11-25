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

class Companies extends React.Component
{
  constructor(props)
  {
    super(props);
    var keyword;
    if (props.keyword == undefined)
    {
      keyword = "";
    }
    else
    {
     keyword = props.keyword;
    }
    this.state =
    {
      companies: [],
      keyword: keyword
    }
    console.log("Keyword for Companies Search: " + keyword);
  }

  async componentDidMount()
  {
    // Simple GET request using fetch
    const data = await fetch('http://localhost:3000/company',
    {
      method: "GET"
    })
    .then(response => response.json());

    this.setState({companies: data});
  }

  render()
  {
    const items = []
    var companiesToDisplay = [];

    this.state.companies.forEach(company => {
      if ((company.name).toLowerCase().startsWith(this.state.keyword.toLowerCase()))
      {
        companiesToDisplay.push(company);
      }
    });


    for (const [index, value] of companiesToDisplay.entries()) {
      items.push(
          
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto"}}> 
                <Card.Img variant="top" src={google} height="200" />
                </div>
                <Card.Body>
                <Card.Title><b>{value.name}</b></Card.Title>
                <Card.Text>
                  {value.description}
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                  {value.industry}
                </Card.Footer>
            </Card>
      )
    }


    return (
      <>
        <CardDeck key={this.props.keyword} style={{ "width": "100%"}}>
          {items}
        </CardDeck>
      </>
    );
  }
}

export { Companies };