import Axios from "axios";
import { Row, Col } from "react-bootstrap";

import { useEffect, useState, useCallback } from "react";
import BugItems from "./BugItems";
import Navbar from "./Navbar";
import Filterbar from "./Filterbar";
import Searchbar from "./Searchbar";
import useAuth from "../hooks/useAuth";

const ManagerInterface = () => {
  const {
    setAvailableProgrammersList,
    bugsList,
    setBugsList,
    filterList,
    setFilterList,
    isLoading,
    setIsLoading,
  } = useAuth();

  const [searchBy, setSearchBy] = useState("");
  const [id, setID] = useState("");
  const [severity, setSeverity] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setSearchBy("ID");
    Axios.get("http://localhost:3001/getSubmitedBugs").then((response) => {
      setBugsList(response.data);
      setFilterList(response.data);
      setIsLoading(false);
    });
    Axios.get("http://localhost:3001/getAllAvailableProgrammers").then(
      (response) => {
        setAvailableProgrammersList(response.data);
      }
    );
  }, []);

  useEffect(() => {
    
    const filter = () => {console.log(severity)
      setFilterList(
        searchBy === "Date"
          ? bugsList.filter((bug) => {
              return (
                bug.severity.includes(severity) &&
                (
                  bug.month.toString() +
                  "/" +
                  bug.day.toString() +
                  "/" +
                  bug.year.toString()
                ).includes(date) &&
                bug.status.includes(status)
              );
            })
          : bugsList.filter((bug) => {
              return (
                bug.severity.includes(severity) &&
                bug.id.toString().includes(id) &&
                bug.status.includes(status)
              );
            })
      );
    };

    filter();
  }, [severity, status, id, date]);

  return (
    <section className="mx-auto" fluid="md" style={{ maxWidth: "800px" }}>
      <Navbar />
      <Row>
        <Col sm="3">
          <Filterbar setSeverity={setSeverity} setStatus={setStatus} />
        </Col>
        <Col sm="9">
          <Searchbar
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            id={id}
            setID={setID}
            date={date}
            setDate={setDate}
            assign="Programmer"
          />
          <BugItems isLoading={isLoading} bugsList={filterList} />
        </Col>
      </Row>
    </section>
  );
};

export default ManagerInterface;
