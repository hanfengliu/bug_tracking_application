import Axios from "axios";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const ProgrammerModal = ({ show, onHide, id, status, setStatus }) => {
  const { auth, setBugsList } = useAuth();
  const [newStatus, setNewStatus] = useState(status);
  const [changing, setChanging] = useState(false);
  const [description, setDescription] = useState("");
  const [solution, setSolution] = useState("");
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (status === newStatus) setChanging(false);
    else setChanging(true);

    if (newStatus === "Fixed") setDisplay(true);
    else setDisplay(false);
  }, [newStatus]);

  const clear = () => {
    setNewStatus(status);
    setDescription("");
    setSolution("");
  };

  const submit = () => {
    if (changing)
      Axios.post("http://localhost:3001/updateStatus", {
        id: id,
        firstName: auth.firstName,
        lastName: auth.lastName,
        status: newStatus,
        description: description,
        solution: solution,
      }).then((res) => {
        console.log(res.data);
        Axios.get("http://localhost:3001/getAssignedBugs", {
          params: {
            firstName: auth.firstName,
            lastName: auth.lastName,
          },
        }).then((response) => {
          setBugsList(response.data);
        });
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
        <Modal.Title>Update Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Change the status:</Form.Label>
            <Form.Select
              onChange={(e) => {
                setNewStatus(e.target.value);
              }}
              required
            >
              <option value={status}>Status</option>
              <option value="Investigating">Investigating</option>
              <option value="Fixing">Fixing</option>
              <option value="Testing">Testing</option>
              <option value="Fixed">Fixed</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className={display ? "mb-3" : " mb-3 d-none"}>
            <Form.Label>Description of this bug:</Form.Label>
            <FloatingLabel label="Description">
              <Form.Control
                as="textarea"
                placeholder="Give a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className={display ? "mb-3" : " mb-3 d-none"}>
            <Form.Label>Any procedure to solve this bug:</Form.Label>
            <FloatingLabel label="Solution">
              <Form.Control
                as="textarea"
                placeholder="Enter solution"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                style={{ height: "100px" }}
              />
            </FloatingLabel>
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
          disabled={
            newStatus === "Fixed" && (description === "" || solution === "")
          }
          onClick={() => {
            submit();
            onHide();
            clear();
            setStatus(newStatus);
          }}
        >
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProgrammerModal;
