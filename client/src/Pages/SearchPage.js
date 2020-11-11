import React from "react";
import { Form, CardDeck, InputGroup, FormControl, Card, Button, Dropdown, DropdownButton } from "react-bootstrap";

export default class SearchPage extends React.Component {

  constructor() {
    super();
    
    this.state = {
        dropDownValue: "Search Categories",
        placeholder: "Search Keywords",
        searchText: ""
    }
  }
    
  changeValue(text, holder) {
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
        <div style={{ "text-align": "center", "margin": "50px 50px" }}>
        <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "margin-bottom": "50px"}}>
          
        
            <Card.Header><h1>Search for companies, job positions, or career fairs</h1></Card.Header>
        <InputGroup className="mb-3">
            <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={this.state.dropDownValue}
                id="input-group-dropdown-1"
            >
                { this.state.dropDownValue != "Company" ? <Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent, "Search Keywords")}>Company</div></Dropdown.Item> : null }
                
                { this.state.dropDownValue != "Position" ? <Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent, "Search Keywords")}>Position</div></Dropdown.Item> : null }

                { this.state.dropDownValue != "Career Fair" ? <Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent, "date")}>Career Fair</div></Dropdown.Item> : null }
                
            </DropdownButton>
            
            <FormControl type={this.state.placeholder} onChange={this.handleSearchInput}
              value={this.state.searchText} placeholder="Search Keywords" aria-describedby="basic-addon1" />
            <InputGroup.Append>
                <Button variant="primary" type="submit" id="basic-addon2" onClick={this.handleSearchSubmit}>Search</Button>
            </InputGroup.Append>
        </InputGroup>
        
        </Card>
        

        <CardDeck>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto"}}> 
                <Card.Img variant="top" src="holder.js/171x180" height="200" />
                </div>
                <Card.Body>
                <Card.Title>Google</Card.Title>
                <Card.Text>
                    <br></br>
                    <b>Recruiter: </b> John Doe
                    <br></br>
                    <br></br>
                    <b>Status: </b> In session
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Students in Queue: </b> 15 </h7> 
                <h1></h1>
                <Button variant="outline-secondary" size="sm">Close Booth</Button></small>
                <br></br>
                </Card.Footer>
            </Card>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
                <Card.Img variant="top" src="holder.js/171x180" height="200"/>
                </div>
                <Card.Body>
                <Card.Title>Microsoft</Card.Title>
                <Card.Text>
                    <br></br>
                    <b>Recruiter: </b> John Doe
                    <br></br>
                    <br></br>
                    <b>Status: </b> In session
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Students in Queue: </b> 15 </h7> 
                <h1></h1>
                <Button variant="outline-dark" size="sm">Close Booth</Button></small>
                <br></br>
                </Card.Footer>
            </Card>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
                <Card.Img variant="top" src="holder.js/171x180" height="200"/>
                </div>
                <Card.Body>
                <Card.Title>Facebook</Card.Title>
                <Card.Text>
                    <br></br>
                    <b>Recruiter: </b> John Doe
                    <br></br>
                    <br></br>
                    <b>Status: </b> Available
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Students in Queue: </b> 15 </h7> 
                <h1></h1>
                <Button variant="outline-success" size="sm">Close Booth</Button></small>
                <br></br>
                </Card.Footer>
            </Card>
            </CardDeck>
            <br></br>
            <CardDeck>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "margin": "auto", "width": "300px"}}> 
                <Card.Img variant="top" src="holder.js/171x180" height="200px"/>
                </div>
                <Card.Body>
                <Card.Title>Apple</Card.Title>
                <Card.Text>
                    <br></br>
                    <b>Recruiter: </b> John Doe
                    <br></br>
                    <br></br>
                    <b>Status: </b> In session
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Students in Queue: </b> 1</h7> 
                <h1></h1>
                <Button variant="outline-secondary" size="sm">Close Booth</Button></small>
                <br></br>
                </Card.Footer>
            </Card>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
                <Card.Img variant="top" src="holder.js/171x180" height="200"/>
                </div>
                <Card.Body>
                <Card.Title>Tesla</Card.Title>
                <Card.Text>
                    <br></br>
                    <b>Recruiter: </b> John Doe
                    <br></br>
                    <br></br>
                    <b>Status: </b> In session
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Students in Queue: </b> 404 </h7> 
                <h1></h1>
                <Button variant="outline-dark" size="sm">Close Booth</Button></small>
                <br></br>
                </Card.Footer>
            </Card>
            <Card style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <div style={{ "width": "200px", "margin": "auto", "padding-top": "10px"}}> 
                <Card.Img variant="top" src="holder.js/171x180" height="200"/>
                </div>
                <Card.Body>
                <Card.Title>Snapchat</Card.Title>
                <Card.Text>
                    <br></br>
                    <b>Recruiter: </b> John Doe
                    <br></br>
                    <br></br>
                    <b>Status: </b> Available
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted"> <h7 style={{"font-size": "15px"}}><b>Students in Queue: </b> 15 </h7> 
                <h1></h1>
                <Button variant="outline-success" size="sm">Close Booth</Button></small>
                <br></br>
                </Card.Footer>
            </Card>
            </CardDeck>
      </div>
      
    );
  }
}
