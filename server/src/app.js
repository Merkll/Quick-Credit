import express from 'express';
import bodyParser from 'body-parser';
import Debug from 'debug';
import morgan from 'morgan';
import apiRoute from './api';
import ErrorHandler from './middleware/error-handler';

const debug = Debug('http');

const app = express();
const port = process.env.PORT || 5000;
app.use(morgan(':method :url :status :response-time ms'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', apiRoute);
app.all('*', (req, res) => {
  res.status(404).json({ status: 404, error: 'Resource not available' });
});


// default error handler
app.use(ErrorHandler);

export default app.listen(port, () => debug(`Server started on port ${port}`));
