const User = require("../models/user.model")
const Cryptr = require('cryptr');
const cryptr = new Cryptr('Mabrur');

// Create and Save a new Customer
exports.create = (req, res) => {
 
      if (!req.body.username
        || !req.body.password) {
        return  res.status(400).send({
            message: "Content can not be empty!"
          });
        }
      
        const password = cryptr.encrypt(req.body.password);
        // Create a Customer
        const user = new User({
          username: req.body.username,
          password: password,
          role: "USER"
        });
      
        // Save Customer in the database
        User.create(user, (err, data) => {
          if (err){
              return res.status(500).send({
                 message:
                   err.message || "Some error occurred while creating the Customer."
               });
          }
          else{
            return res.send(data);
          } 
        });
   
      // Validate request
      
    }

  
  // Retrieve all Customers from the database.
  exports.findAll = (req, res) => {
      User.getAll((err, data) => {
        if (err){
          return  res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving customers."
            });
        }
        else{
         // sql.end();
          return res.send(data);
        } 
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
      
      if (!req.body.username
        || !req.body.oldPassword
        ) {
      return  res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      const password = (req.body.password) ? cryptr.encrypt(req.body.password) : req.body.oldPassword;

        // Create a Customer
        const user = new User({
          username: req.body.username,
          password: password,
          role: "USER"
        });
    
      User.updateById(
        req.params.userId,
        user,
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
      User.remove(req.params.userId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
           return res.status(404).send({
              message: `Not found Customer with id ${req.params.userId}.`
            });
          } else {
          return  res.status(500).send({
              message: "Could not delete Customer with id " + req.params.userId
            });
          }
        } else return res.send({ message: `Customer was deleted successfully!` });
      });
    };
  
  