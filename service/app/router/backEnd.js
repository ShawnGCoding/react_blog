module.exports = app => {
  const { router, controller } = app
  // 针对单个路由进行中间件处理（路由守卫）
  var adminAuth = app.middleware.adminAuth()
  // test router
  router.get('/admin/test', controller.backEnd.main.index)
  router.post('/admin/login', controller.backEnd.main.verify)
  router.get('/admin/type', adminAuth, controller.backEnd.main.getType)
  router.post('/admin/addArticle', controller.backEnd.main.addArticle)
  router.post('/admin/addType', controller.backEnd.main.addType)
  router.post('/admin/deleteArticle', controller.backEnd.main.deleteArticle)
  router.post('/admin/updateArticle', controller.backEnd.main.updateArticle)

}