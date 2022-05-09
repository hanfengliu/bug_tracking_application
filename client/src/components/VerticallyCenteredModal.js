import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const VerticallyCenteredModal = ({
  show,
  onHide,
  severity,
  changeProgrammer,
}) => {
  const { availableProgrammersList } = useAuth();
  const [currentProgrammer, setCurrentProgrammer] = useState("");
  const [newSeverity, setNewSeverity] = useState("");
  const [changing, setChanging] = useState(false);

  useEffect(() => {
      console.log("123");
    if (
      currentProgrammer === "" &&
      (newSeverity === "" || severity === newSeverity)
    )
      setChanging(false);
    else {
      setChanging(true);
    }
  }, [newSeverity, currentProgrammer]);

  useEffect(() => {
    changeProgrammer(currentProgrammer);
  }, [currentProgrammer]);

  const clear = () => {
    setCurrentProgrammer("");
    setNewSeverity("");
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      backdrop={changing ? "static" : true}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Bugs</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Change the severity:</Form.Label>
            <Form.Select
              onChange={(e) => setNewSeverity(e.target.value)}
              required
            >
              <option value="critical">Critical</option>
              <option value="moderate">Moderate</option>
              <option value="minor">Minor</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Select a programmer for this bug:</Form.Label>
            <Form.Select
              onChange={(e) => setCurrentProgrammer(e.target.value)}
              required
            >
              <option value="">Select a Programmer</option>
              {availableProgrammersList.map((availableProgrammer) => (
                <option key={availableProgrammer.id}>
                  {availableProgrammer.firstName} {availableProgrammer.lastName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            clear();
            onHide();
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={onHide}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VerticallyCenteredModal;
