export default (err, req, res, next) => {
  if (err.status) res.status(err.status).send(err);
  else res.status(500).send(err);
  next(err);
};
