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
    let biografiList;
    let bathsulList;
    let eventList;
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
            biografiList = biografi.filter((e, i) => i < 3)
            event = data.filter(e => e.type == "EVENT")
            eventList = event.filter((e, i) => i < 3)
            bathsul = data.filter(e => e.type == "BATHSUL")
            bathsulList = bathsul.filter((e, i) => i < 3)

            Profile.get((err, data) => {
                if (err){
                    return  res.status(500).send({
                        message:
                          err.message || "Some error occurred while retrieving customers."
                      });
                  }
                  else{
                    profile = data[0];

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
                                      return res.send({ profile, slideshow, biografi, event, bathsul, contacts, biografiList, eventList, bathsulList});
                                  } 
                            })
                          } 
                    })
                  } 
            });
          } 
         // return res.send(biografi);
      })   
}

exports.history = (req, res) => {
    let profile;
    let biografi;
    let bathsul;
    let event;
    let contacts;
    let otherArticles;
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
            otherArticles = data.filter((e,i) =>  i < 3)

            Profile.get((err, data) => {
                if (err){
                    return  res.status(500).send({
                        message:
                          err.message || "Some error occurred while retrieving customers."
                      });
                  }
                  else{
                    profile = data;

                    Contact.getAll((err, data) => {
                        if (err){
                            return  res.status(500).send({
                                message:
                                  err.message || "Some error occurred while retrieving customers."
                              });
                          }
                          else{
                              contacts = data;
                              return res.send({ profile, biografi, event, bathsul, contacts, otherArticles});
                          } 
                    })
                  } 
            });
          } 
         // return res.send(biografi);
      })   
}

exports.article = (req, res) => {
    let profile;
    let biografi;
    let bathsul;
    let event;
    let contacts;
    let otherArticles;
    let article;

    Article.findById(req.params.articleId, (err, data) => {
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
              article = data;
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
            otherArticles = data.filter((e,i) =>  i < 3)

            Profile.get((err, data) => {
                if (err){
                    return  res.status(500).send({
                        message:
                          err.message || "Some error occurred while retrieving customers."
                      });
                  }
                  else{
                    profile = data;
                    Contact.getAll((err, data) => {
                        if (err){
                            return  res.status(500).send({
                                message:
                                  err.message || "Some error occurred while retrieving customers."
                              });
                          }
                          else{
                              contacts = data;
                              return res.send({ profile, biografi, event, bathsul, contacts, otherArticles, article});
                          } 
                    })
                    
                  } 
            });
          } 
         // return res.send(biografi);
      }) 
          }
    })
}

exports.search = (req, res) => {
    let profile;
    let biografi;
    let bathsul;
    let event;
    let contacts;
    let otherArticles;
    let articles;
    Article.findByKeyword(req.params.keyword, (err, data) => {
        if (err) {
             return res.status(404).send({
                message: `Not found Search with id ${req.params.keyword}.`
              });
          } else{
              articles = data;
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
                    otherArticles = data.filter((e,i) =>  i < 3)
        
                    Profile.get((err, data) => {
                        if (err){
                            return  res.status(500).send({
                                message:
                                  err.message || "Some error occurred while retrieving customers."
                              });
                          }
                          else{
                            profile = data;
                            Contact.getAll((err, data) => {
                                if (err){
                                    return  res.status(500).send({
                                        message:
                                          err.message || "Some error occurred while retrieving customers."
                                      });
                                  }
                                  else{
                                      contacts = data;
                                      return res.send({ profile, biografi, event, bathsul, contacts, otherArticles, articles});
                                  } 
                            })
                            
                          } 
                    });
                  } 
                 // return res.send(biografi);
              }) 
            }
    })
    
}

exports.type = (req, res) => {
    let profile;
    let biografi;
    let bathsul;
    let event;
    let contacts;
    let otherArticles;
    let articles;
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
            articles = data.filter(e => e.type == req.params.type.toUpperCase())
            otherArticles = data.filter((e,i) =>  i < 3)

            Profile.get((err, data) => {
                if (err){
                    return  res.status(500).send({
                        message:
                          err.message || "Some error occurred while retrieving customers."
                      });
                  }
                  else{
                    profile = data;
                    Contact.getAll((err, data) => {
                        if (err){
                            return  res.status(500).send({
                                message:
                                  err.message || "Some error occurred while retrieving customers."
                              });
                          }
                          else{
                              contacts = data;
                              return res.send({ profile, biografi, event, bathsul, contacts, otherArticles, articles});
                          } 
                    })
                    
                  } 
            });
          } 
         // return res.send(biografi);
      }) 
}


   