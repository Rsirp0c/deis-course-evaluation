const Subscriber = require("../models/subscriber");

module.exports = {
  getAllSubscribers: (req, res) => {
    Subscriber.find({})
      .then((data) => {
        res.render("subscribers", { subscribers: data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getSubscriberPage: (req, res) => {
    res.render("subscribe");
  },
  saveSubscription: (req, res) => {
    Subscriber.find({
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode,
    })
      .then((data) => {
        res.render("thanks", { name: req.body.name });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
