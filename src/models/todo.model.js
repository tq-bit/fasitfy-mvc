const knex = require('../config/knex.config');
const BaseModel = require('../lib/core/BaseModel');
const { TASK_DB_SCHEMA } = require('../schemata/todo.schema');

class TodoModel extends BaseModel {
  constructor(namespace, knex, tables) {
    super(namespace, knex, tables);
  }
}

module.exports = new TodoModel('root/model/todo', knex, TASK_DB_SCHEMA);
