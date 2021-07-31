module.exports = app => {
    const dashboard = require("../controllers/dashboard.controller");
    const verifyToken = require("../middlewares/verifyToken")
  

    app.get("/dashboard", verifyToken, dashboard.dashboard);
    
  };