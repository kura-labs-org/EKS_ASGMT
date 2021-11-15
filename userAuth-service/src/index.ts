// import db
require('./db/config/index');

import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
const userRouter = require('./routes/userRoutes')
import { errorHandler } from '@chefapp/common';
import { NotFoundError } from '@chefapp/common';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
   signed: false,
    secure: true
  })
);

app.use(userRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
  });

app.use(errorHandler);

app.listen(3000, () => {
    console.log('listening on port 3k')
})