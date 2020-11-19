import React from "react";
import { Tab , Tabs, Card} from "react-bootstrap";
import profile from '../Images/profile.jpg'; 
// import profile from '../Images/profile.jpg'; 

export default class StudentLoginPage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
        <div style={{"padding": "20px"}}>
                <Card style={{"box-shadow": "8px 4px 8px 4px rgba(0,0,0,0.2)", "padding": "20px"}}>
                    <Tabs defaultActiveKey="signin" id="uncontrolled-tab-example" style={{"margin": "auto"}}>
                        <Tab eventKey="signin" title="Sign In">
                            
                        </Tab>
                        <Tab eventKey="signup" title="Sign Up">
                        </Tab>
                    </Tabs>
                </Card>
        </div>
    );
  }
}
