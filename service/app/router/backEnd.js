module.exports = app => {
  const { router, controller } = app
  // test router
  router.get('/admin/test', controller.backEnd.main.index)
  router.post('/admin/login', controller.backEnd.main.verify)
}