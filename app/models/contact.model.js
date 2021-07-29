const sql = require("./db.js");

// constructor
const Contact = function(contact) {
  this.name = contact.name;
  this.url = contact.url;
  this.label = contact.label;
};

Contact.getAll = result => {
  sql.query("SELECT * FROM contacts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("contacts: ", res);
    result(null, res);
  });
};

Contact.updateById = (id, contact, result) => {
    sql.query(
      "UPDATE contacts SET name = ?, url = ?, label = ? WHERE id = ?",
      [contact.name, contact.url, contact.label, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found contact with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated contact: ", { id: id, ...contact });
        result(null, { id: id, ...contact });
      }
    );
  };

module.exports = Contact;