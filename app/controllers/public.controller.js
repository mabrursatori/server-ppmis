const Profile = require("../models/profile.model.js");
const Article = require("../models/artilcle.model");
const Contact = require("../models/contact.model")
const Slideshow = require ("../models/slideshow.model")


exports.navbar = (req, res) => {
        let profile;
        let biografi;
        let bathsul;
        let event;
      Article.getAll((err, data) => {

        if (err){
            return  res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving customers."
              });
          }
          else{
            biografi = data.filter(e => e.type == "BIOGRAFI")
            event = data.filter(e => e.type == "EVENT")
            bathsul = data.filter(e => e.type == "BATHSUL")
          } 
         // return res.send(biografi);
      } )

        Profile.get((err, data) => {
            if (err){
                return  res.status(500).send({
                    message:
                      err.message || "Some error occurred while retrieving customers."
                  });
              }
              else{
               // sql.end();
                // return res.send(data);
                profile = data;
                return res.send({ biografi, event, bathsul, profile});
              } 
        });
    }

exports.home = (req, res) => {
    let profile;
    let slideshow;
    let biografi;
    let bathsul;
    let event;
    let contacts;
    Article.getAll((err, data) => {

        if (err){
            return  res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving customers."
              });
          }
          else{
            biografi = data.filter(e => e.type == "BIOGRAFI")
            event = data.filter(e => e.type == "EVENT")
            bathsul = data.filter(e => e.type == "BATHSUL")

            Profile.get((err, data) => {
                if (err){
                    return  res.status(500).send({
                        message:
                          err.message || "Some error occurred while retrieving customers."
                      });
                  }
                  else{
                    profile = data;

                    Slideshow.getAll((err, data) => {
                        if (err){
                            return  res.status(500).send({
                                message:
                                  err.message || "Some error occurred while retrieving customers."
                              });
                          }
                          else{
                              slideshow = data;
                              
                              Contact.getAll((err, data) => {
                                if (err){
                                    return  res.status(500).send({
                                        message:
                                          err.message || "Some error occurred while retrieving customers."
                                      });
                                  }
                                  else{
                                      contacts = data;
                                      return res.send({ profile, slideshow, biografi, event, bathsul, contacts});
                                  } 
                            })
                          } 
                    })
                  } 
            });
          } 
         // return res.send(biografi);
      } )

    

    
}

exports.footer = (req, res) => {
    Contact.getAll((err, data) => {
        if (err){
            return  res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving customers."
              });
          }
          else{
           // sql.end();
            // return res.send(data);
            
            return res.send(data);
          } 
    })
}
   