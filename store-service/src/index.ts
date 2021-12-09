// import db
require('./db/config/index');

import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
const storeRouter = require('./routes/storeRoutes');
const { errorHandler } = require('@chefapp/common');
const { NotFoundError } = require('@chefapp/common');
import { natsWrapper } from './nats-wrapper';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);

app.use(storeRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
  });

app.use(errorHandler);

try {
  try {
    await natsWrapper.connect('ticketing', 'alsdkj', 'http://nats-srv:4222');
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
} catch (err: any) {
  console.log(err.toString());
}

app.listen(3000, () => {
    console.log('listening on port 3k')
})