import React, {useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
  

export const ExperienceInputForm = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="outline-secondary" size="sm" onClick={handleShow}>
          Add Experience
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Experience</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
                <Form.Control size="lg" type="text" placeholder="Add Position" />
                <br />
                <Form.Control type="text" placeholder="Add Date" />
                <br />
                <Form.Control size="sm" type="text" placeholder="Add Description" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
//   render(<Example />);
