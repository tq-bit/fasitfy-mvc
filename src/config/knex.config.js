
const knex = require('knex');

module.exports = knex({
  client: 'mysql',
  connection: {
    host: '192.168.2.159',
    user: 'pi',
    password: 'h4s3nb4nn1',
    database: 'development',
  },
});