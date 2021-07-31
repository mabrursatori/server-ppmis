module.exports = app => {
    const profile = require("../controllers/profile.controlller");
    const {uploadImage, uploadMultiple} = require("../middlewares/multer")
  
    // // Create a new Customer
    // app.post("/slideshow", uploadImage, slideshow.create);
  
    // Retrieve all Customers
   app.get("/profile", profile.findAll);
  
    // // // Retrieve a single Customer with customerId
    //  app.get("/slideshow/:slideshowId");
  
    // Update a Customer with customerId
    app.put("/profile", uploadMultiple, profile.update);
  
    // // Delete a Customer with customerId
    // app.delete("/slideshow/:slideshowId", slideshow.delete);
  
    // // Create a new Customer
    // app.delete("/customers", customers.deleteAll);
  };