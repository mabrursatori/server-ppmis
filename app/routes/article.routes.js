module.exports = app => {
    const article = require("../controllers/article.controller");
    const {uploadImage} = require("../middlewares/multer")
  
    // Create a new Customer
    app.post("/article", uploadImage, article.create);
  
    // Retrieve all Customers
    app.get("/article", article.findAll);
  
    // // // Retrieve a single Customer with customerId
    //  app.get("/slideshow/:slideshowId");
  
    // Update a Customer with customerId
    app.put("/article/:articleId", uploadImage, article.update);
  
    // Delete a Customer with customerId
    app.delete("/article/:articleId", article.delete);
  
    // // Create a new Customer
    // app.delete("/customers", customers.deleteAll);
  };