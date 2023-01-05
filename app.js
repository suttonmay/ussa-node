if (require.main === module) {
	throw new Error('Do not run directly. Use server.js to start.');
}

const Koa = require('koa');
const render = require('@koa/ejs')
const path = require('path')
const serve = require('koa-static')

const app = new Koa();

render(app, {
  root: path.join(__dirname, "views"),
  viewExt: "html",
  cache: false,
  debug: true,
});


// Register Routes
let indexRouter = require('./routes/index');

app.use(indexRouter.routes())
  .use(serve('./public'))
  .use(indexRouter.allowedMethods());

module.exports = app;
