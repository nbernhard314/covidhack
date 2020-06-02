//Setup for routing
// const data = require('../data')
// const userData = data.users;
// const businessData = data.businesses;

const constructorMethod = (app) => {
  app.get("/", async (req, res) => {
    res.json({ result: "success" });
  });

  app.use("*", (req, res) => {
    res.redirect("/");
  });
};

module.exports = constructorMethod;
