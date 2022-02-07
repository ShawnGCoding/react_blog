'use strict';
const Service = require('egg').Service;
class DataService extends Service {
  async getArticleList() {
    let sql = 'select article.id as id,article.title as title,article.introduction as introduction,type.typeName as typeName from article JOIN article_type JOIN type WHERE article.id = article_type.article_id and article_type.type_id = type.id'
    const results = await this.app.mysql.query(sql);
    return results;
  }
  // 通过id获取文章
  async getArticleById() {
    const { ctx } = this;
    let id = ctx.params.id;
    // console.log("params:", ctx.params)
    let sql = 'select article.id as id,article.article_content as content,article.title as title,article.introduction as introduction,type.typeName as typeName from article JOIN article_type JOIN type WHERE article.id = article_type.article_id and article_type.type_id = type.id and article.id = ' + id;
    const results = await this.app.mysql.query(sql)
    return results
  }
  // 得到类别名称和编号
  async getType() {
    const result = await this.app.mysql.select('type');
    return result;
  }
  // 根据type获取文章
  async getArticleByType() {
    const { ctx } = this;
    let id = ctx.params.id;
    let sql = 'select article.id as id,article.title as title,article.introduction as introduction,type.typeName as typeName from article JOIN article_type JOIN type WHERE article.id = article_type.article_id and article_type.type_id = type.id and type.id = ' + id;
    const results = await this.app.mysql.query(sql)
    return results

  }
}
module.exports = DataService;