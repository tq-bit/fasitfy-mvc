const UrlController = require('../controller/url.controller');
const {
  TASK_API_DESC,
  TASK_API_PARAMS,
  TASK_API_QUERY,
  TASK_API_BODY,
  TASK_API_BODY_REQUIRED,
  TASK_API_PARAMS_REQUIRED,
  TASK_API_SCHEMA,
} = require('../schemata/todo.schema');

const todoGetOptions = {
  schema: {
    description: TASK_API_DESC,
    params: TASK_API_PARAMS,
    query: TASK_API_QUERY,
    response: {
      200: TASK_API_BODY,
    },
  },
  handler: UrlController.handleRedirect,
};

const urlRoutes = (fastify, options, done) => {
  fastify.get('/todo/', todoGetOptions);
  done();
};

module.exports = urlRoutes;
