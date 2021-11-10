// import db
require('./db/config/index');

import express from 'express';
import { json } from 'body-parser';
const userRouter = require('./routes/userRoutes')

const app = express();
app.use(json());

app.use(userRouter);

app.listen(3000, () => {
    console.log('listening on port 3k')
})