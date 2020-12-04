import React, {useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import { baseUrl, socketBaseUrl } from "../.config";
  

export const SkillsInputForm = (props) => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = () => {
      const queryUrl = baseUrl + "/resume/" +  props.applicantId + "/";
      const skill = (document.getElementById("skill"))
    
      fetch(queryUrl, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + localStorage.getItem("Authorization") 
        },
        body: JSON.stringify({
          "skill": skill
        })
      })
      
      handleClose()
    }
  
    return (
      <>
        <Button variant="outline-secondary" size="sm" onClick={handleShow}>
          Add Skill
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Experience</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
                <Form.Control id="skill" type="text" placeholder="Add Skill" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClick}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
//   render(<Example />);
