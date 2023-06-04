const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
mongoose.connect("mongodb://localhost:27017/recipe_db");
let db = mongoose.connection;
let contacts = [
  {
    name: "Alex",
    email: "alex@gmail.com",
    zipCode: 10000,
  },
  {
    name: "Juan",
    email: "juan@gmail.com",
    zipCode: 11000,
  },
  {
    name: "Jack",
    email: "jack@gmail.com",
    zipCode: 12000,
  },
  {
    name: "Sophia",
    email: "sophia@gmail.com",
    zipCode: 13000,
  },
  {
    name: "Natalia",
    email: "natalia@gmail.com",
    zipCode: 14000,
  },
];

let commnads = [];

Subscriber.deleteMany({}).then(() => {
  console.log("Subscriber data is empty");
  contacts.forEach((c) => {
    commnads.push(
      Subscriber.create({
        name: c.name,
        email: c.email,
        zipCode: c.zipCode,
      })
        .then((r) => {
          console.log(r);
        })
        .catch((error) => {
          console.log(`ERROR: ${error}`);
        })
    );
  });
});
