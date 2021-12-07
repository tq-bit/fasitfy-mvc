const pino = require('pino')

const logger = pino(pino.destination({dest: './src/jobs/url.log'}))

module.exports = logger;