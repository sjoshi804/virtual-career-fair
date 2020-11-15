const moment = require('moment');

const logger = (req, _, next) => {
  console.log(
    `${moment().format('YYYY-MM-DD HH:mm:ss')}: ${req.method} ${req.protocol}://${req.get('host')}${
    req.originalUrl
    }`
  );
  console.log(JSON.stringify(req.body, null, 2), '\n');
  next();
};

export { logger };