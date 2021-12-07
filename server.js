// require('dotenv').config();
// require("./src/jobs/url.jobs");

// const start = require('./app');

// start();
const TodoModel = require('./src/models/todo.model.js');

(async function () {
  try {
    const stats = await TodoModel.initTables(true);
    console.log(stats);
  } catch (error) {
    console.log(error);
  }
})();
