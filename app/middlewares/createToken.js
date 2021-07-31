var jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('Mabrur');
const User = require("../models/user.model")


const createToken = (req, res) => {
    if(!req.body.username || !req.body.password){
        return  res.status(400).send({
            message: "Content can not be empty!"
          });
    }

 User.login(req.body.username, (err, data) => {
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
          if(req.body.password == cryptr.decrypt(data.password)){
            const token = jwt.sign(req.body, 'Mabrur', { expiresIn: '30d' });
            data.token = token;
            res.send(data);
          }else{
              res.status(402).send({message: "Your password incorrect"})
          }
      } 
 })
}


module.exports = createToken