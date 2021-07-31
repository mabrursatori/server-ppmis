module.exports = app => {
    const users = require("../controllers/user.controller");
  
    // Create a new Customer
    app.post("/users", users.create);
  
    // Retrieve all Customers
    app.get("/users", users.findAll);
  
    // // Retrieve a single Customer with customerId
    // app.get("/customers/:customerId", customers.findOne);
  
    // Update a Customer with customerId
    app.put("/users/:userId", users.update);
  
    // Delete a Customer with customerId
    app.delete("/users/:userId", users.delete);
  
    // // Create a new Customer
    // app.delete("/customers", customers.deleteAll);
  };