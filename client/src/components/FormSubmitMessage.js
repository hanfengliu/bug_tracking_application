import React from "react";
import { Button, Modal } from "react-bootstrap";

const FormSubmitMessage = ({ show, onHide, submitMessage, status }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop={true} keyboard={true}>
      <Modal.Header closeButton>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>{submitMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant={status ? "success" : "danger"} onClick={onHide}>
          Understood
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormSubmitMessage;
