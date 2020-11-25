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
        searchText: "",
        searchResults: <Companies></Companies>
    }
  }
  
  handleRoute = route => () => {
    this.props.history.push({ pathname: route });
    };

  changeValue(type, holder) {
    var element = <Fairs></Fairs>;
    
    if (type == "Position")
    {
      element = <Positions></Positions>;
      
    }
    else if (type == "Company")
    {
      console.log("changeValue:","Company", this.state.searchText);
      element = <Companies keyword={this.state.searchText}></Companies>;
    }
    else
    {
      element = <Fairs></Fairs>;
    }
    this.setState({dropDownValue: "C", holder: holder});
    ReactDOM.render(element, document.getElementById('next'));
    this.setState({dropDownValue: type, holder: holder});
  }

  handleroute = routes => () => {
    this.props.history.push({ pathname: routes });
  };

  handleSearchInput = event => {
    this.setState({
      searchText: event.target.value
    });
    console.log(event.target.value);
    //this.handleSearchSubmit();
  };

  handleSearchSubmit = () => {
    console.log("Search button has been pressed");
    if (this.state.searchText) {
      var placeholder;
      if (this.state.dropDownValue != "Career Fair")
      {
        placeholder = "Search Keyword" ;
      }
      else
      {
        placeholder = "date";
      }
      this.changeValue(this.state.dropDownValue, placeholder)
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
        </InputGroup>
        <Button variant="primary" type="submit" id="basic-addon2" onClick={this.handleSearchSubmit}>Search</Button>
        </Card>

        <div  id="next">
          <Companies></Companies>
        </div>
      </div>


    );
    
  }
  
}

