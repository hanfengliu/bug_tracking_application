const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "bugs_tracking",
});

app.get("/", (req, res) => {
  app.use(express.static(path.join(__dirname, "../client/public/index.html")));
});

app.post("/create", (req, res) => {
  const id = req.body.id;
  const year = req.body.year;
  const month = req.body.month + 1;
  const day = req.body.day;
  const browser = req.body.browser;
  const os = req.body.os;
  const url = req.body.url !== "" ? req.body.url : "N/A";
  const bugs = JSON.parse(req.body.bugs);
  const message = req.body.message !== "" ? req.body.message : "N/A";
  const procedure = req.body.procedure !== "" ? req.body.procedure : "N/A";
  const severity = req.body.severity;
  const date = new Date();
  let maxId;

  const sql_1 =
    "INSERT INTO `submitted_bugs_table` (`userId`, `year`, `month`, `day`, `browser`, `os`, `severity`, `url`, `message`, `procedure`,`status`, `subYear`, `subMonth`, `subDay`, `subHour`, `subMin`, `subSec`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  const sql_2 = "SELECT MAX(submittedBugId) FROM submitted_bugs_table";
  const sql_3 =
    "INSERT INTO `submitted_bugs_list` (`submittedBugId`, `submittedBugDesc`) VALUES (?,?)";

  db.query(
    sql_1,
    [
      id,
      year,
      month,
      day,
      browser,
      os,
      severity,
      url,
      message,
      procedure,
      "Pending",
      date.getFullYear(),
      date.getMonth(),
      date.getUTCDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ],
    (err, result) => {
      if (err) {
        return res.status(500).send({
          message: "An error occurred:" + err.message,
        });
      }
    }
  );

  db.query(sql_2, (err, result) => {
    if (err) {
      return res.status(500).send({
        message: "An error occurred:" + err.message,
      });
    } else {
      maxId = result[0]["MAX(submittedBugId)"];
      const insert = async () => {
        await Promise.all(
          bugs.map((bug) => {
            return queryPromise(sql_3, [maxId, bug]);
          })
        );
      };
      insert();
    }
  });

  const queryPromise = (query, fields) => {
    return new Promise((resolve, reject) => {
      db.query(query, fields, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  };

  return res.status(200).send({
    message: "Values Inserted",
  });
});

app.post("/signUp", (req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const user = req.body.user;
  const password = req.body.password;
  const role = email.substring(
    email.lastIndexOf("@") + 1,
    email.lastIndexOf(".")
  );

  console.log(role);
  if (role === "programmer") {
    console.log("Programmer");
    db.query(
      "SELECT * FROM `programmers_table` WHERE email = ?",
      [email],
      (err, result) => {
        if (err) {
          console.log("An error occurred:" + err.message);
          res.send({
            status: 500,
            message: "An error occurred:" + err.message,
          });
        } else {
          if (result.length > 0) {
            console.log("programmer found");
            return res.send({ status: 409, message: "programmer found" });
          } else {
            console.log("programmer not found");
            db.query(
              "INSERT INTO `programmers_table` (`email`, `firstName`, `lastName`, `programmer`, `password`, `available`) VALUES (?,?,?,?,?,?)",
              [email, firstName, lastName, user, password, true],
              (err, result) => {
                if (err) {
                  console.log("An error occurred:" + err.message);
                  res.send({
                    status: 500,
                    message: "An error occurred:" + err.message,
                  });
                } else {
                  console.log("programmer inseted");
                  res.send({ status: 200, message: "programmer inserted" });
                }
              }
            );
          }
        }
      }
    );
  } else if (role === "manager") {
    console.log("Manager");
    db.query(
      "SELECT * FROM `managers_table` WHERE email = ?",
      [email],
      (err, result) => {
        if (err) {
          console.log("An error occurred:" + err.message);
          res.send({
            status: 500,
            message: "An error occurred:" + err.message,
          });
        } else {
          if (result.length > 0) {
            console.log("manager found");
            return res.send({ status: 409, message: "manager found" });
          } else {
            console.log("manager not found");
            db.query(
              "INSERT INTO `managers_table` (`email`, `firstName`, `lastName`, `manager`, `password`) VALUES (?,?,?,?,?)",
              [email, firstName, lastName, user, password],
              (err, result) => {
                if (err) {
                  console.log("An error occurred:" + err.message);
                  res.send({
                    status: 500,
                    message: "An error occurred:" + err.message,
                  });
                } else {
                  console.log("manager inseted");
                  res.send({ status: 200, message: "manager inserted" });
                }
              }
            );
          }
        }
      }
    );
  } else {
    console.log("User");
    db.query(
      "SELECT * FROM `users_table` WHERE email = ?",
      [email],
      (err, result) => {
        if (err) {
          console.log("An error occurred:" + err.message);
          res.send({
            status: 500,
            message: "An error occurred:" + err.message,
          });
        } else {
          if (result.length > 0) {
            console.log("user found");
            console.log(result);
            return res.send({ status: 409, message: "user found" });
          } else {
            console.log("user not found");
            db.query(
              "INSERT INTO `users_table` (`email`, `firstName`, `lastName`, `user`, `password`) VALUES (?,?,?,?,?)",
              [email, firstName, lastName, user, password],
              (err, result) => {
                if (err) {
                  console.log("An error occurred:" + err.message);
                  res.send({
                    status: 500,
                    message: "An error occurred:" + err.message,
                  });
                } else {
                  console.log("user inseted");
                  res.send({ status: 200, message: "user inserted" });
                }
              }
            );
          }
        }
      }
    );
  }
});

app.post("/signIn", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const role = email.substring(
    email.lastIndexOf("@") + 1,
    email.lastIndexOf(".")
  );
  console.log(role);
  if (role === "programmer") {
    db.query(
      "SELECT * FROM `programmers_table` WHERE email = ? AND password = ?",
      [email, password],
      (err, result) => {
        if (err) {
          console.log("An error occurred:" + err.message);
          res.send({
            status: 500,
            message: "An error occurred:" + err.message,
          });
        } else {
          console.log(result);
          if (result.length > 0) {
            console.log("programmer found");
            console.log(result[0].id);
            return res.send({
              status: 200,
              message: "programmer found",
              roles: ["programmer"],
              id: result[0].programmerId,
              userName: result[0].programmer,
              firstName: result[0].firstName,
              lastName: result[0].lastName,
            });
          } else {
            console.log("programmer not found");
            return res.send({ status: 409, message: "programmer not found" });
          }
        }
      }
    );
  } else if (role === "manager") {
    db.query(
      "SELECT * FROM `managers_table` WHERE email = ? AND password = ?",
      [email, password],
      (err, result) => {
        if (err) {
          console.log("An error occurred:" + err.message);
          res.send({
            status: 500,
            message: "An error occurred:" + err.message,
          });
        } else {
          console.log(result);
          if (result.length > 0) {
            console.log("manager found");
            return res.send({
              status: 200,
              message: "manager found",
              roles: ["manager"],
              id: result[0].managerId,
              userName: result[0].manager,
              firstName: result[0].firstName,
              lastName: result[0].lastName,
            });
          } else {
            console.log("manager not found");
            return res.send({ status: 409, message: "manager not found" });
          }
        }
      }
    );
  } else {
    db.query(
      "SELECT * FROM `users_table` WHERE email = ? AND password = ?",
      [email, password],
      (err, result) => {
        if (err) {
          console.log("An error occurred:" + err.message);
          res.send({
            status: 500,
            message: "An error occurred:" + err.message,
          });
        } else {
          console.log(result);
          if (result.length > 0) {
            console.log("user found");
            return res.send({
              status: 200,
              message: "user found",
              roles: ["user"],
              id: result[0].userId,
              userName: result[0].user,
              firstName: result[0].firstName,
              lastName: result[0].lastName,
            });
          } else {
            console.log("user not found");
            return res.send({ status: 409, message: "user not found" });
          }
        }
      }
    );
  }
});

app.get("/getAllBugs", (req, res) => {
  db.query("SELECT * FROM `bugs`", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getSubmitedBugs", (req, res) => {
  db.query(
    "SELECT * FROM `bugs_table` ORDER BY CASE severity WHEN 'critical' THEN 0 WHEN 'moderate' THEN 1 WHEN 'minor' THEN 2 END, id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getAllAvailableProgrammers", (req, res) => {
  db.query(
    "SELECT * FROM `programmers_table` where available = true",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/editBug", (req, res) => {
  const id = req.body.id;
  const first1 = req.body.first1;
  const last1 = req.body.last1;
  const first2 = req.body.first2;
  const last2 = req.body.last2;
  const severity = req.body.severity;
  const first3 = first1 === "" ? "N/A" : req.body.first3;
  const last3 = first1 === "" ? "N/A" : req.body.last3;
  console.log(first1 + " " + last1);
  console.log(first2 + " " + last2);
  const status = first1 === "" ? "Pending" : "Investigating";
  // console.log(first3 + " " + last3);
  // return;
  db.query(
    "UPDATE `bugs_table` SET `severity` = ?, `programmer` = ?, `status` = ?, `managerFirst` = ?, `managerLast` = ? WHERE `id` = ?",
    [severity, (first1 + " " + last1).trim(), status, first3, last3, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          "UPDATE `programmers_table` SET `available` = ? WHERE `firstName` = ? AND `lastName` = ?",
          [false, first1, last1],
          (err, result) => {
            if (err) {
              console.log(err);
            }
          }
        );
        db.query(
          "UPDATE `programmers_table` SET `available` = ? WHERE `firstName` = ? AND `lastName` = ?",
          [true, first2, last2],
          (err, result) => {
            if (err) {
              console.log(err);
            }
          }
        );
        res.send("Bug Edited");
      }
    }
  );
});

app.get("/getAssignedBugs", (req, res) => {
  db.query(
    "SELECT * FROM `bugs_table` where programmer = ?",
    [req.query["firstName"] + " " + req.query["lastName"]],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/updateStatus", (req, res) => {
  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const status = req.body.status;
  const description =
    req.body.description === "" ? "N/A" : req.body.description;
  const solution = req.body.solution === "" ? "N/A" : req.body.solution;

  db.query(
    "UPDATE `bugs_table` SET `status` = ?, `description` = ?, `solution` = ? WHERE `id` = ?",
    [status, description, solution, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (status === "Fixed")
          db.query(
            "UPDATE `programmers_table` SET `available` = ? WHERE `firstName` = ? AND `lastName` = ?",
            [true, firstName, lastName],
            (err, result) => {
              if (err) {
                console.log(err);
              }
            }
          );
        res.send("Status Updated");
      }
    }
  );
});

app.listen(3001, () => console.log("your server is running on port 3001"));
