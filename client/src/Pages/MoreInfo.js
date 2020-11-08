import React, {useState} from "react";
import {Modal, Button} from "react-bootstrap";
  

export const MoreInfo = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="outline-secondary" size="sm" onClick={handleShow}>
          More Info
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Google</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <p><b>Role: </b>Seeking software engineer interns.</p>
              <p><b>Year: </b>Sophomores and Juniors. This internship is intended for students who are pursuing a Bachelor's degree program in Computer Science or a related field with an anticipated graduation date after December 2021, depending on their program and unique circumstances.</p> 
              <p><b>Description: </b>Join us for a 12-14 week paid internship that offers personal and professional development, an executive speaker series, and community-building. The Software Engineering Internship program will give you an opportunity to work on complex computer science solutions, develop scalable, distributed software systems, and also collaborate on multitudes of smaller projects that have universal appeal.</p>
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
