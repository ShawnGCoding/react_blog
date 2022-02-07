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
      this.ctx.session.openId = { 'openId': openId }
      ctx.body = { status: 1, 'openId': openId }
    }
    else {
      ctx.body = { status: 0 }
    }

  }
}
module.exports = MainController 