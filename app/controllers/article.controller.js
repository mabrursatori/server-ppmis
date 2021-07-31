const Article = require ("../models/artilcle.model")
const fs = require('fs-extra');
const path = require('path');
var dateFormat = require("dateformat");


exports.findAll = (req, res) => {
    Article.getAll((err, data) => {
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
  
    if (!req.body.title
        || !req.body.caption
        || !req.body.content
        || !req.body.type
        || !req.file) {
      return  res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      // Create a Customer
      const article = new Article({
        title: req.body.title,
        image: `${req.file.destination}/${req.file.filename}`,
        caption: req.body.caption,
        content: req.body.content,
        type: req.body.type,
        date: dateFormat(Date.now(), "yyyy-mm-dd hh:MM:ss")
      });
      // Save Customer in the database
      Article.create(article, (err, data) => {
        if (err)
         return res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Customer."
          });
        else return res.send(data);
      });
  };



exports.update = (req, res) => {
  if (!req.body.title 
    || !req.body.caption
    || !req.body.content
    || !req.body.type
    || !req.body.oldImage) {
    return  res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const article = new Article({
        image: (req.file) ? `${req.file.destination}/${req.file.filename}` : req.body.oldImage,
        title: req.body.title,
        caption: req.body.caption,
        content: req.body.content,
        type: req.body.type,
        date: dateFormat(Date.now(), "yyyy-mm-dd hh:MM:ss")
      });

    Article.findById(req.params.articleId, async (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
         return res.status(404).send({
            message: `Not found Article with id ${req.params.articleId}.`
          });
        } else {
        return  res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.articleId
          });
        }
      } else{
        id = data.id;
        image = data.image;
        
        if(req.file){
          await fs.unlink(path.join(image));
        }

        Article.updateById(req.params.articleId, article, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
             return res.status(404).send({
                message: `Not found Customer with id ${req.params.articleId}.`
              });
            } else {
            return  res.status(500).send({
                message: "Error updating Customer with id " + req.params.articleId
              });
            }
          } else return res.send(data);
        })
        
      }
    })


}

exports.delete =  (req, res) => {

  Article.findById(req.params.articleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
       return res.status(404).send({
          message: `Not found Customer with id ${req.params.articleId}.`
        });
      } else {
      return  res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.articleId
        });
      }
    } else{
      id = data.id;
      image = data.image;

      Article.remove(id, async (err, data) => {
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