const Article = require("../models/artilcle.model");

exports.dashboard = (req, res) => {
    let event;
    let biografi;
    let bathsul;
    Article.getAll((err, data) => {

        if (err){
            return  res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving customers."
              });
          }
          else{
            biografi = data.filter(e => e.type == "BIOGRAFI")
            biografi = biografi.length;
            event = data.filter(e => e.type == "EVENT")
            event = event.length;
            bathsul = data.filter(e => e.type == "BATHSUL")
            bathsul = bathsul.length;
            res.send({biografi, event, bathsul})
          } 
         // return res.send(biografi);
      } )
}