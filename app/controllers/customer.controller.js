const Customer = require("../models/customer.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  try{
    if (!req.body) {
      return  res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      const customer = new Customer({
        email: req.body.email,
        name: req.body.name
      });
    
      // Save Customer in the database
      Customer.create(customer, (err, data) => {
        if (err)
         return res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Customer."
          });
        else return res.send(data);
      });
  }catch(error){
      return res.status(500).send({message: "Try again"})
  }
    // Validate request
    
  };

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
      if (err)
      return  res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else return res.send(data);
    });
  };

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
         return res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
        return  res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.customerId
          });
        }
      } else return res.send(data);
    });
  };

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
    return  res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Customer.updateById(
      req.params.customerId,
      new Customer(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
           return res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`
            });
          } else {
          return  res.status(500).send({
              message: "Error updating Customer with id " + req.params.customerId
            });
          }
        } else return res.send(data);
      }
    );
  };

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Customer.remove(req.params.customerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
         return res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
        return  res.status(500).send({
            message: "Could not delete Customer with id " + req.params.customerId
          });
        }
      } else return res.send({ message: `Customer was deleted successfully!` });
    });
  };

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Customer.removeAll((err, data) => {
      if (err)
      return  res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else return res.send({ message: `All Customers were deleted successfully!` });
    });
  };