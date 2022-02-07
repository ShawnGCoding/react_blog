
module.exports = app => {
  const { router, controller } = app
  router.get('/frontEnd/getArticleList', controller.frontEnd.home.getArticleList);
  router.get('/frontEnd/getArticleById/:id', controller.frontEnd.home.getArticleById);
  router.get('/frontEnd/getArticleByType/:id', controller.frontEnd.home.getArticleByType);
  router.get('/frontEnd/getType', controller.frontEnd.home.getType);
}