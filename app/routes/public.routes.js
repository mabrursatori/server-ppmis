module.exports = app => {
    const public = require("../controllers/public.controller");
  
    // Create a new Customer
    app.get("/home", public.home);
    app.get("/history", public.history);
    app.get("/home/:articleId", public.article);
    app.get("/home/search/:keyword", public.search);
    app.get("/home/type/:type", public.type);
    
  };