const sql = require("./db.js");

// constructor
const Slideshow = function(slideshow) {
  this.image = slideshow.image;
  this.number = slideshow.number;
};

module.exports = Slideshow;