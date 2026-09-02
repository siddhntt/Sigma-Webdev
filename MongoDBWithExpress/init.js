const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "neha",
    to: "preeti",
    msg: "send me notes of exam",
    created_at: new Date(),
  },
  {
    from: "rohit",
    to: "mohit",
    msg: "teach me js calback",
    created_at: new Date(),
  },
  {
    from: "anita",
    to: "ramesh",
    msg: "bring me some fruits",
    created_at: new Date(),
  },
  {
    from: "tony",
    to: "pepper",
    msg: "love you 1000",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);