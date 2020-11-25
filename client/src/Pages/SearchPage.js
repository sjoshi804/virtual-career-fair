import React from "react";

import * as ReactDOM from 'react-dom';
import { Form, CardDeck, InputGroup, FormControl, Card, Button, Dropdown, DropdownButton, Toast } from "react-bootstrap";
import { Fairs } from './Fairs'
import { Companies } from './Companies'
import { Positions } from './Positions'
import { CompanyCard } from "./companyCard";


export default class SearchPage extends React.Component {

  constructor() {
    super();
    
    this.state = {
        dropDownValue: "Company",
        placeholder: "Search",
        searchText: "",
        companies: [],
        fairs: [],
        jobs: []
    }
  }

  async componentDidMount()
  {
    // TODO: Optimize this with pagination etc., #jobs and career fairs can grow very quickly and will make this page store too much data

    // Get all companies
    const companies = await fetch('http://localhost:3000/company',
    {
      method: "GET"
    })
    .then(response => response.json());
    console.log(companies);
    // Get all jobs
    const fairs = []

    const jobs = []

    this.setState(
      {
        companies: companies,
        fairs: fairs,
        jobs: jobs
      }
    );
  }
  
  // General routing - set the path correctly in navigation
  handleRoute = route => () => {
    this.props.history.push({ pathname: route });
    };

  // Change value of the dropdown sets the state of dropdown to render accordingly
  changeValue(type, placeholder) {
    console.log("Type of search changed", type, placeholder);
    this.setState(
      {
        dropDownValue: type,
        placeholder: placeholder
      }
    );
  }

  // Set state on every change of input
  handleSearchInput = event => {
    console.log("New keyword", event.target.value);
    this.setState({
      searchText: event.target.value
    });
    console.log(event.target.value);
  };

  // Render handles which type of elements to render: company, job or fairs
  // Also filters by keyword
  render() {
    var searchResults = [];
    if (this.state.dropDownValue == "Company")
    {
      this.state.companies.forEach(element => {
        if (element.name.startsWith(this.state.searchText))
        {
          searchResults.push(<CompanyCard name={element.name} industry={element.industry} description={element.description}></CompanyCard>);
        }
      });

      console.log(searchResults);
    }
    else if (this.state.dropDownValue == "Position")
    {

    }
    else if (this.state.dropDownValue == "Career Fair")
    {

    }
    else
    {
      console.log("ERROR", "Invalid drop down value");
    }

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
        </Card>

        <CardDeck>
        {searchResults}
        </CardDeck>
      </div>
    );
    
  }
  
}

