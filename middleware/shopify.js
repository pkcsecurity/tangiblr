const Shopify = require('shopify-api-node');

const users = {};

const addUser = async (ctx, next) => {
  const { username, password, shopName, apiKey, apiSecret } = ctx.request.body;

  if (!username || !password || !shopName || !apiKey || !apiSecret) 
    ctx.send(400, "Blank field");

  const newUser = {
    password,
    shopName,
    apiKey,
    apiSecret
  };
  users[username] = newUser;

  ctx.send(204);
}

const login = async (ctx, next) => {
  const { username, password } = ctx.request.body;

  if (!username || !password)
    ctx.send(400, "Blank field");

  if (password == users[username].password) 
    ctx.send(204);
  else 
    ctx.send(401);
}

const getCustomersByUsername = async (ctx, next) => {
  const username = ctx.request.body.username;
  const { shopName, apiKey, apiSecret } = users[username];

  const shopify = new Shopify({
    shopName,
    apiKey,
    password: apiSecret
  });

  ctx.send(200, shopify.customer.list());
}

const getCustomers = async (ctx, next) => {
  const users = await shopify.customer.list();
  console.log(users);
  await next();
}

module.exports = {
  users,
  addUser,
  login,
  getCustomersByUsername
};