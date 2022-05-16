import Axios from "axios";
import { Row, Col } from "react-bootstrap";

import { useEffect, useState } from "react";
import BugItems from "./BugItems";
import Navbar from "./Navbar";
import Filterbar from "./Filterbar";
import Searchbar from "./Searchbar";
import useAuth from "../hooks/useAuth";

const ProgrammerInterface = () => {
  const {
    auth,
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

  useEffect(() => {
    setSearchBy("ID");
    Axios.get("http://localhost:3001/getAssignedBugs", {
      params: {
        firstName: auth.firstName,
        lastName: auth.lastName,
      },
    }).then((response) => {
      setBugsList(response.data);
      setFilterList(response.data);
      setIsLoading(false);
    });
    
  }, []);

  useEffect(() => {
    const filter = () => {
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
                ).includes(date)
              );
            })
          : bugsList.filter((bug) => {
              return (
                bug.severity.includes(severity) &&
                bug.id.toString().includes(id)
              );
            })
      );
    };

    filter();
  }, [severity, id, date]);

  return (
    <section className="mx-auto" fluid="md" style={{ maxWidth: "800px" }}>
      <Navbar />
      <Row>
        <Col sm="3">
          <Filterbar setSeverity={setSeverity} />
        </Col>
        <Col sm="9">
          <Searchbar
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            id={id}
            setID={setID}
            date={date}
            setDate={setDate}
            assign="Manager"
          />
          <BugItems isLoading={isLoading} bugsList={filterList} />
        </Col>
      </Row>
    </section>
  );
};

export default ProgrammerInterface;
