const sql = require("./db.js");

// constructor
const User = function(user) {
  this.username = user.username;
  this.password = user.password;
  this.role = user.role;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

  User.findById = (userId, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found User: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };

  User.login = (username, result) => {
    sql.query(`SELECT * FROM users WHERE username = '${username}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res[0]);
        return;
      }
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };

  User.getAll = result => {
    sql.query("SELECT * FROM users WHERE role != 'ADMIN'", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("users: ", res);
      result(null, res);
    });
  };

  User.updateById = (id, user, result) => {
    sql.query(
      "UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?",
      [user.username, user.password, user.role, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found user with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  };

  User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted customer with id: ", id);
      result(null, res);
    });
  };

module.exports = User;