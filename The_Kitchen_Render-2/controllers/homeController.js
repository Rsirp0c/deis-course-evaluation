module.exports = {
  index: (req, res) => {
    res.render("index.ejs");
  },
  chat: (req, res) => {
    res.render("chat");
  },
};
