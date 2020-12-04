import React, {useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import { baseUrl } from "../.config";
  

export const ExperienceInputForm = (props) => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = () => {
      const queryUrl = baseUrl + "/resume/" +  props.applicantId + "/";
      const organization = (document.getElementById("organization"))
      const date = (document.getElementById("date"))
      const description = (document.getElementById("description"))

      fetch(queryUrl, {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("Authorization") 
        },
        body: JSON.stringify({
          experiences: props.experiences + {"startDate": date, "origanization": organization, "description": description},
          skills: props.skills
        })
      })
      handleClose()
    }
  
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
                <Form.Control id="position" size="lg" type="text" organization="Add Organization" />
                <br />
                <Form.Control id="date" type="text" placeholder="Add Start Date" />
                <br />
                <Form.Control id="description" size="sm" type="text" placeholder="Add Description" />
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
