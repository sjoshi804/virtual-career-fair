import React from "react";

import * as ReactDOM from 'react-dom';
import { Form, CardDeck, InputGroup, FormControl, Card, Button, Dropdown, DropdownButton, Toast } from "react-bootstrap";
import { CompanyCard } from "./companyCard";
import { FairCard } from "./FairCard";
import { JobCard } from "./JobCard";

export default class SearchPage extends React.Component {

  constructor() {
    super();
    
    this.state = {
        dropDownValue: "Company",
        searchText: "",
        companies: [],
        fairs: [],
        jobs: []
    }
  }

  async componentDidMount()
  {
    // TODO: Optimize this with pagination etc., #jobs and career fairs can grow very quickly and will make this page store too much data
    // TODO: Update url to be set dynamically based on prod/dev otherwise may have issues in deployment with this

    // Get all companies
    const companies = await fetch('http://localhost:3000/company',
    {
      method: "GET"
    })
    .then(response => response.json());

    // Get all jobs - by looping through every company
    var jobs = [];
    for (let company of companies)
    {
      var jobsAtCompany = await fetch('http://localhost:3000/company/' + company._id + "/job",
      {
        method: "GET"
      })
      .then(response => response.json());
      
      jobsAtCompany.forEach(job => {
        job.company = company.name;
        jobs.push(job);
      });
    }

    const fairs = await fetch('http://localhost:3000/careerFair',
    {
      method: "GET"
    })
    .then(response => response.json());

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
        if (element.name.toLowerCase().startsWith(this.state.searchText.toLowerCase()))
        {
          searchResults.push(
          <CompanyCard 
          key={element.name}
          company={element}>

          </CompanyCard>
          );
        }
      });

      console.log(searchResults);
    }
    else if (this.state.dropDownValue == "Job")
    {
      this.state.jobs.forEach(element => {
        console.log(element);
        var isMatch = element.company.toLowerCase().startsWith(this.state.searchText.toLowerCase());
      
        for (let word of element.title.toLowerCase().split(" "))
        {
          if (word.startsWith(this.state.searchText.toLowerCase()))
          {
            isMatch = true;
            break;
          }
        }

        if (isMatch)
        {
          searchResults.push(
          <JobCard 
          key={element._id}
          job={element}>

          </JobCard>
          );
        }
      });
    }
    else if (this.state.dropDownValue == "Career Fair")
    {
      this.state.fairs.forEach(element => {
        var isMatch = element.name.toLowerCase().startsWith(this.state.searchText.toLowerCase()) || element.organizer.toLowerCase().startsWith(this.state.searchText.toLowerCase());
        
        // Convert startTime and endTime to date objects
        element.startTime = new Date(element.startTime);
        element.endTime = new Date(element.endTime);
        // Set status based on current time
        if (element.startTime < new Date() && element.endTime > new Date())
        {
          element.status = "Live";
        }
        else if (element.endTime < new Date())
        {
          element.status = "Past"
        }
        else
        {
          element.status = "Upcoming"
        }

        if (isMatch)
        {
          searchResults.push(
          <FairCard 
          key={element._id}
          fair={element}>
          
          </FairCard>
          );
        }
      });
    }
    else
    {
      console.log("ERROR", "Invalid drop down value");
    }

    return (
        <div id="root" style={{ textAlign: "center", margin: "50px 50px" }}>
        <Card style={{boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", marginBottom: "50px"}}>
          
        
            <Card.Header><h1>Search for companies, jobs, or career fairs</h1></Card.Header>
        <InputGroup className="mb-3">
            <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={this.state.dropDownValue}
                id="input-group-dropdown-1"
             >
                { this.state.dropDownValue !== "Company" ? <Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent, "Search Keywords")}>Company</div></Dropdown.Item> : null }
                
                { this.state.dropDownValue !== "Job" ? <Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent, "Search Keywords")}>Job</div></Dropdown.Item> : null }

                { this.state.dropDownValue !== "Career Fair" ? <Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent, "date")}>Career Fair</div></Dropdown.Item> : null }
                
            </DropdownButton>
           <FormControl type="text" onChange={this.handleSearchInput}
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

