const Contact = require("../models/contact.model");

exports.findAll = (req, res) => {
    Contact.getAll((err, data) => {
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
    })
}


exports.update = (req, res) => {
    // if (!req.body.name || !req.body.label || req.body.url) {
    //   return  res.status(400).send({
    //       message: "Content can not be empty!"
    //     });
    //   }
  
      const contact = new Contact({
        name: req.body.name,
        label: req.body.label,
        url: req.body.url
      });
  
      Contact.updateById(req.params.contactId, contact, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
           return res.status(404).send({
              message: `Not found Contact with id ${req.params.contactId}.`
            });
          } else {
          return  res.status(500).send({
              message: "Error updating Contact with id " + req.params.contactId
            });
          }
        } else return res.send(data);
      })
  
  
  }