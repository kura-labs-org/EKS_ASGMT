// import db
require('./db/config/index');

import express from 'express';
import { json } from 'body-parser';
const storeRouter = require('./routes/storeRoutes')

const app = express();
app.use(json());

app.use(storeRouter);

app.listen(3000, () => {
    console.log('listening on port 3k')
})