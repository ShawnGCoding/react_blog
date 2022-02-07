'use strict';

const Controller = require('egg').Controller;
// 前台的控制器Controller
class HomeController extends Controller {
  async getArticleList() {
    const { ctx } = this
    let results = await ctx.service.getArticleService.getArticleList();
    let processedResults = this.mergeTag(results);
    ctx.body = { processedResults }
  }
  async getArticleById() {
    const { ctx } = this
    let results = await ctx.service.getArticleService.getArticleById();
    let processedResults = this.mergeTag(results);
    // console.log(processedResults);
    ctx.body = { processedResults };
  }
  // 获取所有类别
  async getType() {
    const { ctx } = this;
    let results = await ctx.service.getArticleService.getType();
    ctx.body = {
      results
    }
  }
  // 根据type获取文章
  async getArticleByType() {
    const { ctx } = this;
    let results = await ctx.service.getArticleService.getArticleByType();
    let processedResults = this.mergeTag(results);
    ctx.body = { processedResults }
  }
  // 将数组中的标签合并
  mergeTag(arr) {
    let map = new Map()
    arr.map((item, index, array) => {
      const id = item.id
      const type = item.typeName
      if (map.has(id)) {
        let oldContent = map.get(id)
        map.set(id, { ...oldContent, typeName: [...oldContent.typeName, type] })
      } else {
        map.set(id, { ...item, typeName: [item.typeName] })
      }
    })
    let processedResults = Array.from(map.values())
    return processedResults;
  }

}

module.exports = HomeController;