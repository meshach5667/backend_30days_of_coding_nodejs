const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('oops');
};

module.exports = errorHandler;
