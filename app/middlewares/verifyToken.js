var jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        var decoded = jwt.verify(token, 'Mabrur');
        next()
      } catch(err) {
        res.status(402).send({message: "Sesi anda habis"});
      }
}

module.exports = verifyToken;