const express = require('express');
const bodyParser = require('body-parser');
const apiRoute = require('./api');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', apiRoute);


// default error handler
app.use((err, req, res, next) => {
  res.status(500).send(err);
  next(err);
});

app.listen(port, () => process.stdout.write(`Server started on port ${port}`));
