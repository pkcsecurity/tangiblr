const Lob = require('lob')(process.env.LOB_SECRET);
const fs = require('fs');

const frontHtml = fs.readFileSync(`${__dirname}/postcard_front.html`, { encoding: 'utf-8' });
const backHtml = fs.readFileSync(`${__dirname}/postcard_back.html`, { encoding: 'utf-8' });

const createPostcard = async ({ to, from, name, campaign_id }) => {
  const options = {
    to,
    from,
    size: '4x6',
    front: frontHtml,
    back: backHtml,
    merge_variables: null,
    metadata: { name, campaign_id },
  };
  return await Lob.postcards.create(options);
};
