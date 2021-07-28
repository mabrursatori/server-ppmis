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

module.exports = Article;