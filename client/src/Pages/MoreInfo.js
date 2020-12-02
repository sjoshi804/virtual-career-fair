import React, {useState} from "react";
import {Modal, Button} from "react-bootstrap";
  

class MoreInfo extends React.Component
{
  constructor()
  {
    super();
    this.state = 
    {
      show: false
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleShow()
  {
    this.setState(
      {
        show: true
      }
    )
  }

  handleClose()
  {
    this.setState(
      {
        show: false
      }
    )
  }

  render()
  {
    return (
      <>
        <Button variant="outline-secondary" size="sm" onClick={this.handleShow}>
          More Info
        </Button>
  
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.company.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <p><b>Role: </b>Seeking software engineer interns.</p>
              <p><b>Year: </b>Sophomores and Juniors. This internship is intended for students who are pursuing a Bachelor's degree program in Computer Science or a related field with an anticipated graduation date after December 2021, depending on their program and unique circumstances.</p> 
              <p><b>Description: </b>Join us for a 12-14 week paid internship that offers personal and professional development, an executive speaker series, and community-building. The Software Engineering Internship program will give you an opportunity to work on complex computer science solutions, develop scalable, distributed software systems, and also collaborate on multitudes of smaller projects that have universal appeal.</p>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
    }
  }
  
//   render(<Example />);
export { MoreInfo }