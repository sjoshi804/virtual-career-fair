import React from "react";

import * as ReactDOM from 'react-dom';
import { Form, CardDeck, InputGroup, FormControl, Card, Button, Dropdown, DropdownButton, Toast } from "react-bootstrap";
import { Fairs } from './Fairs'
import { Companies } from './Companies'
import { Positions } from './Positions'


export default class SearchPage extends React.Component {

  constructor() {
    super();
    
    this.state = {
        dropDownValue: "Company",
        placeholder: "Search",
        searchText: ""
    }
  }
  
  handleRoute = route => () => {
    this.props.history.push({ pathname: route });
    };

  changeValue(text, holder) {
    var element = <Fairs></Fairs>;
    if (text == "Position")
    {
      element = <Positions></Positions>;
      
    }
    else if (text == "Company")
    {
      element = <Companies></Companies>;
    }
    else
    {
      element = <Fairs></Fairs>;
    }
    ReactDOM.render(element, document.getElementById('next'));
    this.setState({dropDownValue: text, placeholder: holder})  
  }

  handleroute = routes => () => {
    this.props.history.push({ pathname: routes });
  };

  handleSearchInput = event => {
    this.setState({
      searchText: event.target.value
    });
  };

  handleSearchSubmit = () => {
    if (this.state.searchText) {
      this.props.history.push({
        pathname: "/results",
        state: {
          searchText: this.state.searchText
        }
      });
    } else {
      alert("Please enter some search text!");
    }
  };

  render() {
  
    return (
        <div id="root" style={{ "text-align": "center", "margin": "50px 50px" }}>
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "margin-bottom": "50px"}}>
          
        
            <Card.Header><h1>Search for companies, job positions, or career fairs</h1></Card.Header>
        <InputGroup className="mb-3">
            <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={this.state.dropDownValue}
                id="input-group-dropdown-1"
            >
                { this.state.dropDownValue !== "Company" ? <Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent, "Search Keywords")}>Company</div></Dropdown.Item> : null }
                
                { this.state.dropDownValue !== "Position" ? <Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent, "Search Keywords")}>Position</div></Dropdown.Item> : null }

                { this.state.dropDownValue !== "Career Fair" ? <Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent, "date")}>Career Fair</div></Dropdown.Item> : null }
                
            </DropdownButton>
            
            <FormControl type={this.state.placeholder} onChange={this.handleSearchInput}
              value={this.state.searchText} placeholder="Search Keywords" aria-describedby="basic-addon1" />
            <InputGroup.Append>
                <Button variant="primary" type="submit" id="basic-addon2" onClick={this.handleSearchSubmit}>Search</Button>
            </InputGroup.Append>
        </InputGroup>
        
        </Card>

        <div  id="next">
        <Companies></Companies>
          </div>
      </div>


    );
    
  }
  
}

