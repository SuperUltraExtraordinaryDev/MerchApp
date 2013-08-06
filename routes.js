var views = require('./app/controllers/views'),
    categories = require('./app/controllers/api/categories');

module.exports = function (app) {
  app.get('/', views.index);
  app.get('/api/categories', categories.getAll);
  app.get('/api/categories/:id', categories.getById);
  app.get('/:folder/:view', views.partial);

//  app.get('/posts/', posts.list);
//  app.get('/posts/create/', posts.create_form);
//  app.post('/posts/create/', posts.create);
//  app.get('/posts/:id/', posts.one);
//  app.get('/posts/:id/remove/', posts.remove);
//  app.get('/posts/:id/update/', posts.update_form);
//  app.post('/posts/:id/update/', posts.update);
};
