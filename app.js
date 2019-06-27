const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const Logger = require('koa-logger');
const serve = require('koa-static');
const mount = require('koa-mount');
const cors = require('koa-cors');
const HttpStatus = require('http-status');
const respond = require('koa-respond');

// Koa middleware
const shopifyRoutes = require('./middleware/shopify');

const app = new Koa();
app.use(serve('frontend/build'));
app.use(BodyParser());
app.use(Logger());
app.use(respond());
// app.use(cors());

const PORT = process.env.PORT || 5000;
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;

const router = new Router();

router.post('/customers', shopifyRoutes.getCustomersByUsername);
router.post('/signup', shopifyRoutes.addUser);
router.post('/login', shopifyRoutes.login);

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, function() {
  console.log('==> 🌎 Listening on port %s. Visit http://localhost:%s/', PORT, PORT);
});
