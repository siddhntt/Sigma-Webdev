const express = require("express");
const app = express();

let port = 8080;

app.listen(port, () =>{
    console.log(`app is listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("you contacted root path nodemon");
});

app.get("/apple", (req, res) => {
    res.send("you contacted apple path");
})

app.get("/orange", (req, res) => {
    res.send("you contacted orange path");
});

// app.get("/*", (req, res) => {
//     res.send("this path does not exist");
// });



app.post("/", (req, res) => {
    res.send("you sent a post request to the root");
});

app.use((req, res) => {
    res.status(404).send("this path does not exist");
});

// app.use((req, res) => {
//     console.log("request recieved");
//     // res.send("this is the basic response");

//     let code = "<h1> Fruits </h1> <ul><li>Apple</li><li>Orangr</li></ul>";
//     res.send(code);
// });