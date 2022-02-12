'use strict';
const Controller = require('egg').Controller

class MainController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = 'hello world'
  }
  async verify() {
    const { ctx } = this
    const find = await ctx.service.getAdminLoginInfo.verifyInfo()
    // 如果登陆成功返回状态为1，证明校验用户名密码成功
    if (find.find) {
      let openId = new Date().getTime()
      ctx.session.openId = openId
      ctx.body = { status: 1, openId }
    }
    else {
      ctx.body = { status: 0 }
    }
  }
  async getType() {
    const { ctx } = this
    const types = await ctx.service.getAdminLoginInfo.getType()
    const typeArray = []
    types.result.forEach(item => typeArray.push(item.typeName))
    ctx.body = { typeArray }
  }
  // 添加文章
  async addArticle() {
    const { ctx } = this
    const results = await ctx.service.crudArticle.addArticle()
    ctx.body = { results }
  }
  // 添加类别
  async addType() {
    const { ctx } = this
    const results = await ctx.service.crudArticle.addType()
    ctx.body = results
  }
  // 删除文章
  async deleteArticle() {
    const { ctx } = this
    const results = await ctx.service.crudArticle.deleteArticle()
    ctx.body = { results }
  }
  // 更新文章
  async updateArticle() {
    const { ctx } = this
    const results = await ctx.service.crudArticle.updateArticle()
    ctx.body = { results }
  }
}
module.exports = MainController 