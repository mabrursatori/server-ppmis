const sql = require("./db.js");

// constructor
const Article = function(article) {
  this.title = article.title;
  this.image = article.image;
  this.caption = article.caption;
  this.date = article.date;
  this.content = article.content;
  this.type = article.type;
};

Article.create = (newArticle, result) => {
    sql.query("INSERT INTO articles SET ?", newArticle, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created customer: ", { id: res.insertId, ...newArticle });
      result(null, { id: res.insertId, ...newArticle });
    });
  };

  Article.findById = (articleId, result) => {
    sql.query(`SELECT * FROM articles WHERE id = ${articleId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found Article: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Article with the id
      result({ kind: "not_found" }, null);
    });
  };

  Article.getAll = result => {
    sql.query("SELECT * FROM articles ORDER BY DATE DESC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Article: ", res);
      result(null, res);
    });
  };

  Article.updateById = (id, article, result) => {
    sql.query(
      "UPDATE articles SET title = ?, image = ?, caption = ?, date = ?, content = ?, type = ? WHERE id = ?",
      [article.title, article.image, article.caption, article.date, article.content, article.type, article. id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found Article with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated Article: ", { id: id, ...article });
        result(null, { id: id, ...article });
      }
    );
  };

  Article.remove = (id, result) => {
    sql.query("DELETE FROM articles WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Article with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted Article with id: ", id);
      result(null, res);
    });
  };


module.exports = Article;