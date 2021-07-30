module.exports = app => {
    const slideshow = require("../controllers/slideshow.controller");
    const {uploadImage} = require("../middlewares/multer")
  
    // Create a new Customer
    app.post("/slideshow", uploadImage, slideshow.create);
  
    // Retrieve all Customers
    app.get("/slideshow", slideshow.findAll);
  
    // // Retrieve a single Customer with customerId
     app.get("/slideshow/:slideshowId");
  
    // Update a Customer with customerId
    app.put("/slideshow/:slideshowId", uploadImage, slideshow.update);
  
    // Delete a Customer with customerId
    app.delete("/slideshow/:slideshowId", slideshow.delete);
  
    // // Create a new Customer
    // app.delete("/customers", customers.deleteAll);
  };