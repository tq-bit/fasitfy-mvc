const EventEmitter = require('events');

/**
 * @typedef {String} namespace
 */

class Base extends EventEmitter {
  /**
   * @type {namespace} namespace
   */
  constructor(namespace = '') {
    super();
    this.namespace = namespace;
  }
}

module.exports = Base;
