import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import Debug from 'debug';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';
import { ErrorHandler } from './middleware/error-handler';
import Seed from './db/seed';

const debug = Debug('http');
const router = express.Router();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(morgan(':method :url :status :response-time ms'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  process.env.HOST = req.get('host');
  console.log(req.body);
  next();
});
app.use('/', routes(router));

app.all('*', (req, res) => {
  res.status(404).json({ status: 404, error: 'Resource not available' });
});


// default error handler
app.use(ErrorHandler);

export default app.listen(port, async () => {
  debug(`Server started on port ${port}`);
  await Seed();
});
