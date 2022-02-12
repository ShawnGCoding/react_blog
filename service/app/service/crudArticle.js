'use strict'
const Service = require('egg').Service
const uuid = require('node-uuid')
class ArticleService extends Service {
  // 添加文章
  async addArticle() {
    const { ctx, app } = this
    const id = ctx.request.body.id
    const title = ctx.request.body.title
    const article_content = ctx.request.body.article_content
    const introduction = ctx.request.body.introduction
    const createTime = ctx.request.body.createTime
    const visit_count = ctx.request.body.visit_count
    const types = ctx.request.body.types
    // 根据typeName找id
    let resultArray = types.map((item) => {
      return app.mysql.select('type', {
        where: { typeName: item },
        columns: ['id']
      })
    })
    resultArray = await Promise.all(resultArray)
    let insertArticleSuccess = ''
    let insertArticleTypeSuccess = '插入文章类别成功'
    // 插入文章
    const insertArticleResult = await app.mysql.insert('article', { id, title, article_content, introduction, createTime, visit_count })
    if (insertArticleResult.affectedRows === 1) {
      // console.log('插入文章成功')
      insertArticleSuccess = '插入文章成功'
    } else {
      // console.log('插入文章失败')
      insertArticleSuccess = '插入文章失败'
    }
    let insertArticleType = null
    // console.log('resultArray:', resultArray)
    // 插入文章对应的类别
    resultArray.map(async (item) => {
      const newItem = item[0]
      // console.log('item[0]:', item[0])
      insertArticleType = await app.mysql.insert('article_type', { article_id: id, type_id: newItem.id })
      if (insertArticleType.affectedRows === 1) {
        // console.log('插入文章类别成功')
      } else {
        insertArticleTypeSuccess('插入文章类别失败')
        // console.log('插入文章类别失败')
      }
    })
    return { insertArticleSuccess, insertArticleTypeSuccess }

  }

  // 删除文章
  async deleteArticle() {
    const { ctx, app } = this
    const id = ctx.request.body.id
    let deleteSuccess = 1
    const resultArr = await Promise.all([app.mysql.delete('article', { id }), app.mysql.delete('article_type', { article_id: id })])
    console.log('resultArr:', resultArr)
    resultArr.map(item => {
      if (item.affectedRows === 0) {
        deleteSuccess = 0
      }
    })
    return deleteSuccess ? { status: 1 } : { status: 0 }
  }
  // 修改文章
  async updateArticle() {
    const { ctx, app } = this
    const title = ctx.request.body.title
    const introduction = ctx.request.body.introduction
    const article_content = ctx.request.body.article_content
    const createTime = ctx.request.body.createTime
    const id = ctx.request.body.id
    // 修改article表
    const row = {
      id,
      title,
      introduction,
      article_content,
      createTime
    }
    const result = await this.app.mysql.update('article', row)
    if (result.affectedRows !== 0) {
      return { status: 1 }
    } else {
      return { status: 0 }
    }
  }
  // 查看文章时提升热度
  async addArticleVisitCount() {
    const { ctx, app } = this
    const id = ctx.params.id
    const result = app.mysql.query('update article set visit_count = (visit_count + 1) where id = ?', [id])
    return result
  }
  // status为1代表插入成功，0代表插入失败（已存在？）
  async addType() {
    const { ctx, app } = this
    const type = ctx.request.body.type
    const result = await app.mysql.get('type', { typeName: type })
    if (result === null) {
      let insertTypeSuccess = await app.mysql.insert('type', { id: uuid.v1().split('-').join(''), typeName: type, orderNum: 10 })
      if (insertTypeSuccess.affectedRows === 1) {
        return { status: 1 }
      }
    } else {
      return { status: 0 }
    }
  }
}

module.exports = ArticleService