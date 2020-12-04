import React, {useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import { baseUrl } from "../.config";
  

export const ExperienceInputForm = (props) => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = () => {
      const queryUrl = baseUrl + "/resume/" +  props.applicantId + "/";
      const organization = (document.getElementById("organization").value)
      const startDate = (document.getElementById("startDate").value)
      const endDate = (document.getElementById("endDate").value)
      const description = (document.getElementById("description").value)

      fetch(queryUrl, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + localStorage.getItem("Authorization") 
        },
        body: JSON.stringify({
          experiences: [{"startDate": startDate, "endDate": endDate, "organization": organization, "description": description}]
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
                <Form.Control id="organization" size="lg" type="text" organization="Add Organization" />
                <br />
                <Form.Control id="startDate" type="text" placeholder="Add Start Date" />
                <br />
                <Form.Control id="endDate" type="text" placeholder="Add End Date" />
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
