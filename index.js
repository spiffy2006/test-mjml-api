const Koa = require('koa');
const Router = require('@koa/router');
const app = new Koa();
const router = new Router();
const mjml = require('mjml');
const templates = require('./templates');

function getTemplate(template, data = {}) {
  if (!templates[template]) {
    return null;
  }
  return templates[template](data);
}



router.get('/mjml/:template', (ctx, next) => {
  // ctx.router available
  const file = getTemplate(ctx.params.template, ctx.request.query);
  if (file === null) {
    ctx.body = 'No template exists'
  }
  ctx.body = mjml(file).html;
});

router.get('/', async (ctx, next) => {
  // ctx.router available
  
  ctx.body = "Hey, make a template already.";
})

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT || 3000);