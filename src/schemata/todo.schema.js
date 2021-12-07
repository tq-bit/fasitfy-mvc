const { DateTime } = require('luxon');

/***********************\
 * Schemata for the API *
\***********************/
exports.TASK_API_DESC =
  'Takes in the short URL and automatically redirects to the long one. ' +
  'This behavior can be overwritten by setting the query param`redirect` ' +
  'to false. In that case, the redirect object will be returned. ';

exports.TASK_API_SCHEMA = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    originalUrl: { type: 'string', format: 'uri' },
    shortUrl: { type: 'string', format: 'uri' },
    slug: { type: 'string' },
    description: { type: 'string', maxLength: 120 },
    created: { type: 'string', format: 'date' },
    expires: { type: 'string', format: 'date' },
    redirects: { type: 'number', minimum: 0 },
  },
};

exports.TASK_API_BODY = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      example: 'Wash the dishes',
    },
    description: {
      type: 'string',
      maxLength: 255,
      example: 'I got to wash the dishes rather quickly',
    },
  },
};

exports.TASK_API_QUERY = {
  type: 'object',
  properties: {
    q: {
      type: 'string',
      description: 'Search by "id, shortUrl, originalUrl"',
      example: 'https://google.com',
    },
    offset: {
      type: 'number',
      description: 'Define how many entries are to be skipped',
      default: 0,
      minimum: 0,
    },
    limit: {
      type: 'number',
      description: 'Define how many entries are to be selected',
      default: 50,
      minimum: 0,
      maximum: 75,
    },
  },
};

exports.TASK_API_PARAMS = {
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
};

exports.TASK_API_PARAMS_REQUIRED = ['id'];
exports.TASK_API_BODY_REQUIRED = ['title', 'description'];

/***********************\
 * Schemata for the DB  *
\***********************/

/**
 * @desc  Function to create the postgresql
 *        schema for the 'url' resource
 * @param {Object} table
 */
exports.TASK_DB_SCHEMA = [{
  knexTableName: 'todo',
  knexSchemaColumns: [],
  knexSchemaConstructor: (table) => {
    table.increments('id');
    table.string('title');
    table.string('description');
    table.date('created').defaultTo(DateTime.now().toISODate());
    table.date('due').defaultTo(DateTime.now().toISODate());
  }
}]

