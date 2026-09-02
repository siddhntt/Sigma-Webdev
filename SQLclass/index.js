const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "sigma_app",
  password: "Siddhant@73",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

let q = "INSERT INTO user (id, username, email, password) VALUES ?";
// let users = [
//   ["123b", "123_newuserb", "abc@gmail.comb", "abcb"],
//   ["123c", "123_newuserc", "abc@gmail.comc", "abcc"],
// ];

//HOME Route
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in database");
  }
});

//SHOW Route
app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render("showusers.ejs", { users });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in database");
  }
});

//EDIT Route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in database");
  }
});

//UPDATE Route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (formPass != user.password) {
        res.send("Wrong Password");
      } else {
        let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("some error in database");
  }
});

//Add Route
app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/user", (req, res) => {
  let { email, username, password } = req.body;
  let id = faker.string.uuid();

  let q3 = `INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)`;
  try {
    connection.query(q3, [id, username, email, password], (err, result) => {
      if (err) throw err;
      res.redirect("/user");
    });
  } catch (err) {
    console.log(err);
    res.send("some error in database");
  }
});

//DELETE Route
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q4 = `SELECT * FROM user WHERE id = ?`;
  connection.query(q4, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Database error");
    }

    let user = result[0];
    res.render("delete.ejs", { user });
  });
});

app.delete("/user/:id", (req,res) =>{
  let {id} = req.params;
  let {username, password} = req.body;
  let q4 = `SELECT * FROM user WHERE id = ?`;
  connection.query(q4, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Database error");
    }

    let user = result[0];
    if(!user){
      return res.send("User not found")
    }
    if(username !==user.username || password !== user.password){
      return res.send("Wrong username or password");
    }
    
    let q5 = `DELETE FROM user WHERE id = ?`;
    connection.query(q5, [id], (err,result) =>{
      if (err) {
        console.log(err);
        return res.send("Delete failed");
      }

      res.redirect("/user");
    })
  })
})

app.listen("8080", () => {
  console.log("server is listening to port 8080");
});

// try {
//   connection.query(q, [data], (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
// } catch (err) {
//   console.log(err);
// }

// connection.end();
