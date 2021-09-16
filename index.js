const Koa = require('koa');
const Router = require('@koa/router');
const app = new Koa();
const router = new Router();
const mjml = require('mjml');
const templates = require('./templates');

function parseSubTemplates({ sub_templates = null, ...data }) {
  if (!sub_templates) {
    return data;
  }
  const subTemplates = {};
  const split = String(sub_templates).split(",");
  split.map(s => s.split(':')).forEach(([prop, template]) => {
    const t = getTemplate(template, { ...data, ...subTemplates }, true);
    if (t) {
      subTemplates[prop] = t;
    }
  });
  return { ...data, ...subTemplates };
}

function getTemplate(template, data = {}, isSub = false) {
  const withSubTemplates = parseSubTemplates(data);
  if (!templates[template]) {
    return null;
  }
  const t = templates[template](withSubTemplates);
  if (isSub) {
    return t || null;
  }
  if (!t) {
    return null;
  }
  try {
    return mjml(t).html;
  } catch (e) {
    return t;
  }
}



router.get('/mjml/:template', (ctx, next) => {
  // ctx.router available
  const file = getTemplate(ctx.params.template, ctx.request.query);
  if (file === null) {
    ctx.body = 'No template exists'
  }
  ctx.body = file;
});

router.get('/', async (ctx, next) => {
  // ctx.router available
  
  ctx.body = "Hey, make a template already.";
})

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT || 3000);