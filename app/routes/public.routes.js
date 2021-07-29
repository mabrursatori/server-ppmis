module.exports = app => {
    const public = require("../controllers/public.controller");
  
    // Create a new Customer
    app.get("/navbar", public.navbar);
    app.get("/home", public.home);
    app.get("/footer", public.footer);
  
    
  };