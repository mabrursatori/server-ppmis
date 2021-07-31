const sql = require("./db.js");

// constructor
const Profile = function(profile) {
  this.imageLogo = profile.imageLogo;
  this.registration = profile.registration;
  this.titleHistory = profile.titleHistory;
  this.imageHistory = profile.imageHistory;
  this.contentHistory = profile.contentHistory;
  this.isLogo = profile.isLogo;
};

Profile.get = result => {
  sql.query("SELECT * FROM profile", (err, res) => {
    if (err) {
     // sql.end();
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("profile: ", res);
  //  sql.end();
    result(null, res);
    return;
  })
};

Profile.updateById = (id, profile, result) => {
    sql.query(
      "UPDATE profile SET imageLogo = ?, registration = ?, titleHistory = ?, imageHistory = ?, contentHistory = ?, isLogo = ? WHERE id = ?",
      [profile.imageLogo, profile.registration, profile.titleHistory, profile.imageHistory, profile.contentHistory, profile.isLogo, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found profile with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated profile: ", { id: id, ...profile });
        result(null, { id: id, ...profile });
      }
    );
  };


module.exports = Profile;