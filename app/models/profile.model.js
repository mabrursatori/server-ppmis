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

module.exports = Profile;