const Base = require('./BaseClass');

/**
 * @typedef { import("./BaseClass").namespace } namespace
 * @typedef { import("knex")} knex
 *
 * @typedef {Array<table>} tables
 *
 * @typedef {Object} table
 * @property {String} knexTableName
 * @property {Array<String>} knexSchemaColumns
 * @property {Function} knexSchemaConstructor
 * @example {
 *  knexSchema = (t) => {
 *   t.string('name')
 *   t.string('adress')
 *  },
 *  knexSchmeaColumns = ['name', 'adress']
 * }
 */

class BaseModel extends Base {
  /**
   * @param {namespace} namespace
   * @param {knex} knex
   * @param {tables} tables
   */
  constructor(namespace = '', knex, tables = []) {
    super(namespace);
    this.client = knex;
    this.tables = tables;
  }

  async initTables(resetTables) {
    const tables = this.getTables();

    /** @type {table} */
    return tables.forEach(async (table) => {
      const { knexTableName, knexSchemaConstructor } = table;
      console.log(knexTableName);
      // @ts-ignore
      const { schema } = this.getDbClient();
      const tableExists = await schema.hasTable(knexTableName);

      if (resetTables && tableExists) {
        await schema.dropTable(knexTableName);
        await schema.createTable(knexTableName, knexSchemaConstructor);
      }

      if (!tableExists) {
        await schema.createTable(knexTableName, knexSchemaConstructor);
      }
    });
  }

  getDbClient() {
    return this.client;
  }

  getTables() {
    return this.tables;
  }
}

module.exports = BaseModel;
