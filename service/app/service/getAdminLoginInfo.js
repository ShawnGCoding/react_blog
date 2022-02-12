'use strict'
const Service = require('egg').Service

class LoginService extends Service {
  async verifyInfo() {
    const { ctx } = this;
    const username = ctx.request.body.username
    const password = ctx.request.body.password
    const find = await this.app.mysql.get('login', { username, password })
    return { find }
  }
  async getType() {
    const result = await this.app.mysql.select('type');
    return { result }
  }
}
module.exports = LoginService