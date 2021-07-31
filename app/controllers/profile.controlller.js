const Profile = require("../models/profile.model.js");
const fs = require('fs-extra');
const path = require('path');

exports.findAll = (req, res) => {
    Profile.get((err, data) => {
        if (err){
          return  res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving customers."
            });
        }
        else{
         // sql.end();
          return res.send(data[0]);
        } 
      });
}

exports.update = (req, res) => {
    if (
        !req.body.oldImageLogo ||
        !req.body.oldRegistration ||
        !req.body.titleHistory ||
        !req.body.oldImageHistory ||
        !req.body.contentHistory ||
        !req.body.isLogo) {
      return  res.status(400).send({
          message: "Content can not be empty!"
        });
      }
   // return  res.json((req.files.imageLogo) ? `${req.files.imageLogo[0].destination}/${req.files.imageLogo[0].filename}` : req.body.oldImageLogo)
      let imageLogo = (req.files.imageLogo) ? `${req.files.imageLogo[0].destination}/${req.files.imageLogo[0].filename}` : req.body.oldImageLogo;
      let registration = (req.files.registration) ? `${req.files.registration[0].destination}/${req.files.registration[0].filename}` : req.body.oldRegistration;
      let imageHistory = (req.files.imageHistory) ? `${req.files.imageHistory[0].destination}/${req.files.imageHistory[0].filename}` : req.body.oldImageHistory;
  
      const profile = new Profile({
        imageLogo: imageLogo,
        registration: registration,
        imageHistory : imageHistory,
        titleHistory : req.body.titleHistory,
        contentHistory: req.body.contentHistory,
        isLogo: req.body.isLogo
      });
  
          Profile.updateById(1, profile, async (err, data) => {
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
            } else{
                if(req.files.imageLogo){
                    await fs.unlink(path.join(req.body.oldImageLogo));
                }
                if(req.files.registration){
                    await fs.unlink(path.join(req.body.oldRegistration));
                }
                if(req.files.imageHistory){
                    await fs.unlink(path.join(req.body.oldImageHistory));
                }
                return res.send(data);
            }
          })
          
        
      
  
  
  }