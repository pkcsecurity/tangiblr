const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const Logger = require('koa-logger');
const serve = require('koa-static');
const mount = require('koa-mount');
const cors = require('koa-cors');
const HttpStatus = require('http-status');
const Shopify = require('shopify-api-node');

// Koa middleware
const shopifyRoutes = require('./middleware/shopify');

const app = new Koa();
app.use(serve('frontend/build'));
app.use(BodyParser());
app.use(Logger());
// app.use(cors());

const PORT = process.env.PORT || 5000;
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;

const shopify = new Shopify({
  shopName: 'tangiblr.myshopify.com',
  apiKey: apiKey,
  password: apiSecret,
});

const router = new Router();

router.get('/book', async (ctx, next) => {
  const books = ['Speaking javascript', 'Fluent Python', 'Pro Python', 'The Go programming language'];
  ctx.status = HttpStatus.OK;
  ctx.body = books;
  await next();
});

router.get('/customers', shopifyRoutes.getCustomers);


app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, function() {
  console.log('==> 🌎 Listening on port %s. Visit http://localhost:%s/', PORT, PORT);
});
