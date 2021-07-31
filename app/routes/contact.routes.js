module.exports = app => {
    const contact = require("../controllers/contact.controller");
  
    // // Create a new Customer
    // app.post("/slideshow", uploadImage, slideshow.create);
  
    // Retrieve all Customers
   app.get("/contacts", contact.findAll);
  
    // // // Retrieve a single Customer with customerId
    //  app.get("/slideshow/:slideshowId");
  
    // Update a Customer with customerId
    app.put("/contacts/:contactId", contact.update);
  
    // // Delete a Customer with customerId
    // app.delete("/slideshow/:slideshowId", slideshow.delete);
  
    // // Create a new Customer
    // app.delete("/customers", customers.deleteAll);
  };