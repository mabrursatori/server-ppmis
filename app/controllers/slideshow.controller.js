const Slideshow = require ("../models/slideshow.model")
const fs = require('fs-extra');
const path = require('path');


exports.findAll = (req, res) => {
    Slideshow.getAll((err, data) => {
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
}

exports.create = (req, res) => {
  
      if (!req.body.number || !req.file) {
        return  res.status(400).send({
            message: "Content can not be empty!"
          });
        }
        // Create a Customer
        const slideshow = new Slideshow({
          image: `${req.file.destination}/${req.file.filename}`,
          number: req.body.number
        });
        // Save Customer in the database
        Slideshow.create(slideshow, (err, data) => {
          if (err)
           return res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Customer."
            });
          else return res.send(data);
        });
    };

exports.update = (req, res) => {
  if (!req.body.number || !req.body.oldImage) {
    return  res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const slideshow = new Slideshow({
      image: (req.file) ? `${req.file.destination}/${req.file.filename}` : req.body.oldImage,
      number: req.body.number
    });

    Slideshow.findById(req.params.slideshowId, async (err, data) => {
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
      } else{
        id = data.id;
        image = data.image;
        
        if(req.file){
          await fs.unlink(path.join(image));
        }

        Slideshow.updateById(req.params.slideshowId, slideshow, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
             return res.status(404).send({
                message: `Not found Customer with id ${req.params.slideshowId}.`
              });
            } else {
            return  res.status(500).send({
                message: "Error updating Customer with id " + req.params.slideshowId
              });
            }
          } else return res.send(data);
        })
        
      }
    })


}

exports.delete =  (req, res) => {

  Slideshow.findById(req.params.slideshowId, (err, data) => {
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
    } else{
      id = data.id;
      image = data.image;

      Slideshow.remove(id, async (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
           return res.status(404).send({
              message: `Not found Customer with id ${req.params.slideshowId}.`
            });
          } else {
          return  res.status(500).send({
              message: "Could not delete Customer with id " + req.params.slideshowId
            });
          }
        } else {
          await fs.unlink(path.join(image));
           return res.send({ message: `Customer was deleted successfully!` });
        }
      });
    }
  })

  
};