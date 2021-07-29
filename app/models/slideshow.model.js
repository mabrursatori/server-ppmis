const sql = require("./db.js");

// constructor
const Slideshow = function(slideshow) {
  this.image = slideshow.image;
  this.number = slideshow.number;
};

Slideshow.create = (newSlideshow, result) => {
    sql.query("INSERT INTO slideshow SET ?", newSlideshow, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created slideshow: ", { id: res.insertId, ...newSlideshow });
      result(null, { id: res.insertId, ...newSlideshow });
    });
  };

  Slideshow.findById = (slideshowId, result) => {
    sql.query(`SELECT * FROM slideshow WHERE id = ${slideshowId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Slideshow: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Slideshow with the id
      result({ kind: "not_found" }, null);
    });
  };

  Slideshow.getAll = result => {
    sql.query("SELECT * FROM slideshow ORDER BY number", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("slideshow: ", res);
      result(null, res);
    });
  };

  Slideshow.updateById = (id, slideshow, result) => {
    sql.query(
      "UPDATE slideshow SET image = ?, number = ? WHERE id = ?",
      [slideshow.image, slideshow.number, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found slideshow with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated slideshow: ", { id: id, ...slideshow });
        result(null, { id: id, ...slideshow });
      }
    );
  };

  Slideshow.remove = (id, result) => {
    sql.query("DELETE FROM slideshow WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Slidehow with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted Slidehow with id: ", id);
      result(null, res);
    });
  };

module.exports = Slideshow;