module.exports = app => {
    const dashboard = require("../controllers/dashboard.controller");
  

    app.get("/dashboard", dashboard.dashboard);
    
  };