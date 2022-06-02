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

  const sql_1 =
    "INSERT INTO `submitted_bugs_table` (`userId`, `year`, `month`, `day`, `browser`, `os`, `severity`, `url`, `message`, `procedure`,`status`, `subYear`, `subMonth`, `subDay`, `subHour`, `subMin`, `subSec`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  const feild_1 = [
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
  ];
  const sql_2 = "SELECT MAX(submittedBugId) FROM `submitted_bugs_table`";
  const sql_3 =
    "INSERT INTO `submitted_bugs_list` (`submittedBugId`, `submittedBugDesc`) VALUES (?,?)";

  queryPromise(sql_1, feild_1)
    .then(() => {
      console.log("inserted");
    })
    .catch((err) => {
      return res.status(500).send({
        message: "An error occurred:" + err.message,
      });
    });

  queryPromise(sql_2)
    .then((result) => {
      console.log(result[0]["MAX(submittedBugId)"]);
      const insertBugList = async (list) => {
        await Promise.all(
          list.map((item) => {
            return queryPromise(sql_3, [
              result[0]["MAX(submittedBugId)"],
              item,
            ]);
          })
        );
      };
      insertBugList(bugs)
        .then(() => {
          return res.status(200).send({
            message: "Values Inserted",
          });
        })
        .catch((err) => {
          return res.status(500).send({
            message: "An error occurred:" + err.message,
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "An error occurred:" + err.message,
      });
    });
});

app.post("/signUp", (req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const user = req.body.user;
  const password = req.body.password;
  const role = email.substring(email.indexOf("@") + 1, email.lastIndexOf("."));

  let sql_1;
  let sql_2;
  let field = [email, firstName, lastName, user, password];

  if (role === "programmer") {
    sql_1 = "SELECT * FROM `programmers_table` WHERE email = ?";
    sql_2 =
      "INSERT INTO `programmers_table` (`email`, `firstName`, `lastName`, `user`, `password`, `available`) VALUES (?,?,?,?,?,?)";
    field = [email, firstName, lastName, user, password, true];
  } else if (role === "manager") {
    sql_1 = "SELECT * FROM `managers_table` WHERE email = ?";
    sql_2 =
      "INSERT INTO `managers_table` (`email`, `firstName`, `lastName`, `user`, `password`) VALUES (?,?,?,?,?)";
  } else {
    sql_1 = "SELECT * FROM `users_table` WHERE email = ?";
    sql_2 =
      "INSERT INTO `users_table` (`email`, `firstName`, `lastName`, `user`, `password`) VALUES (?,?,?,?,?)";
  }

  console.log(role);
  queryPromise(sql_1, [email])
    .then((result) => {
      if (result.length > 0) {
        console.log(role + " found");
        return res.status(409).send({ message: role + " found" });
      } else {
        console.log(role + " not found");
        queryPromise(sql_2, field)
          .then(() => {
            console.log(role + " inseted");
            res.status(200).send({ message: role + " inserted" });
          })
          .catch((err) => {
            console.log("An error occurred:" + err.message);
            return res.status(500).send({
              message: "An error occurred:" + err.message,
            });
          });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "An error occurred:" + err.message,
      });
    });
});

app.post("/signIn", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let role = email.substring(email.indexOf("@") + 1, email.lastIndexOf("."));

  let sql;
  let field = [email, password];

  if (role === "programmer")
    sql = "SELECT * FROM `programmers_table` WHERE email = ? AND password = ?";
  else if (role === "manager")
    sql = "SELECT * FROM `managers_table` WHERE email = ? AND password = ?";
  else {
    sql = "SELECT * FROM `users_table` WHERE email = ? AND password = ?";
    role = "user";
  }

  queryPromise(sql, field)
    .then((result) => {
      console.log(result);
      if (result.length > 0) {
        console.log(role + " found");
        console.log(result[0].id);
        return res.status(200).send({
          message: role + " found",
          roles: [role],
          id: result[0].id,
          userName: result[0].user,
          firstName: result[0].firstName,
          lastName: result[0].lastName,
        });
      } else {
        console.log(role + " not found");
        return res.status(409).send({ message: role + " not found" });
      }
    })
    .catch((err) => {
      console.log("An error occurred:" + err.message);
      return res.status(500).send({
        message: "An error occurred:" + err.message,
      });
    });
});

app.get("/getAllBugs", (req, res) => {
  const sql = "SELECT * FROM `bugs`";
  queryPromise(sql)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
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
