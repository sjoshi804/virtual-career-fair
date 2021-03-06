import React, {useState} from "react";
import {Modal, Button} from "react-bootstrap";
  

export const DetailedStats = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="outline-secondary" size="sm" onClick={handleShow}>
          Details
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>Recruiters at Fair</Modal.Header>
          <Modal.Body>
              <p><b>Recruiters Attending: </b>
              <br></br> John Doe (Microsoft)
              <br></br> Jane Doe (Snapchat)
              <br></br> Jane Doe (Google)
              <br></br> John Doe (Tesla)
              </p>
              <p><b>Recruiters Not Attending(Registered): </b>
              <br></br> Jane Doe (Microsoft)
              <br></br> John Doe (Amazon)
              </p> 
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
//   render(<Example />);
