require('./db/config/index');

import express from 'express';
import { morgan } from 'morgan';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
const app = express(),
  userRouter = require('./routes/index');


app.set('trust proxy', true)

app.use(json());
// Log all requests
app.use(morgan('dev'));
  
//cookie session
app.use(cookieSession({
   signed: true,
   secure: true,
}))

// Unauthenticated routes
app.use('/api/users', userRouter);

  
app.listen(5000, () =>{
   console.log('listening port 5000')
})