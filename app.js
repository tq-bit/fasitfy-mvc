//@ts-ignore
const fastify = require('fastify')({ logger: true });
const { API_PORT, API_HOST } = process.env;
fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'URL Shortener OpenAPI Documentation' },
  },
});
fastify.register(require('fastify-cors'));
fastify.register(require('./src/routes/url.route'));

const start = async () => {
  try {
    await fastify.listen(API_PORT, API_HOST);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

module.exports = start;
