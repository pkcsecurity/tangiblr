const getCustomers = async (ctx, next) => {
  const users = await shopify.customer.list();
  console.log(users);
  await next();
}

module.exports = {
  getCustomers
};