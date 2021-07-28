const sql = require("./db.js");

// constructor
const Contact = function(contact) {
  this.name = contact.name;
  this.url = contact.url;
  this.label = contact.label;
};

module.exports = Contact;