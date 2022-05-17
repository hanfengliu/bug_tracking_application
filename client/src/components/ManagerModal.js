import Axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const ManagerModal = ({
  show,
  onHide,
  id,
  programmer,
  severity,
  setProgrammer,
  setSeverity,
  setStatus,
}) => {
  const {
    auth,
    availableProgrammersList,
    setAvailableProgrammersList,
    setBugsList,
  } = useAuth();
  const [currentProgrammer, setCurrentProgrammer] = useState(programmer);
  const [origionalProgrammer, setOriginalProgrammer] = useState(programmer);
  const [newSeverity, setNewSeverity] = useState(severity);
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    if (programmer === currentProgrammer && severity === newSeverity)
      setChanging(false);
    else setChanging(true);
  }, [newSeverity, currentProgrammer]);

  const clear = () => {
    setCurrentProgrammer(programmer);
    setNewSeverity(severity);
    setChanging(false);
  };

  const submit = (currentProgrammer) => {
    console.log(currentProgrammer);
    const index1 = currentProgrammer.indexOf(" ");
    const first1 = currentProgrammer.substring(0, index1);
    const last1 = currentProgrammer.substring(index1 + 1);
    const index2 = origionalProgrammer.indexOf(" ");
    const first2 = origionalProgrammer.substring(0, index2);
    const last2 = origionalProgrammer.substring(index2 + 1);
    if (changing)
      Axios.post("http://localhost:3001/editBug", {
        id: id,
        first1: first1,
        last1: last1,
        first2: first2,
        last2: last2,
        severity: newSeverity,
        first3: auth.firstName,
        last3: auth.lastName,
      }).then((res) => {
        console.log(res.data);
        Axios.get("http://localhost:3001/getAllAvailableProgrammers").then(
          (response) => {
            setAvailableProgrammersList(response.data);
          }
        );
        Axios.get("http://localhost:3001/getSubmitedBugs").then((response) => {
          setBugsList(response.data);
        });
        setOriginalProgrammer(currentProgrammer);
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      backdrop={changing ? "static" : true}
      keyboard={changing ? false : true}
    >
      <Modal.Header>
        <Modal.Title>Edit Bug</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Change the severity:</Form.Label>
            <Form.Select
              onChange={(e) => {
                setNewSeverity(e.target.value);
              }}
              required
            >
              <option value={severity}>Severity</option>
              <option value="critical">Critical</option>
              <option value="moderate">Moderate</option>
              <option value="minor">Minor</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Select a programmer for this bug:</Form.Label>
            <Form.Select
              onChange={(e) => {
                setCurrentProgrammer(e.currentTarget.value);
              }}
              required
            >
              <option value={programmer}>Select a Programmer</option>
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
        <Button
          variant="primary"
          onClick={() => {
            submit(currentProgrammer);
            onHide();
            clear();
            setProgrammer(currentProgrammer);
            setSeverity(newSeverity);
            setStatus(
              currentProgrammer === "N/A" ? "Pending" : "Investigating"
            );
          }}
        >
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ManagerModal;
