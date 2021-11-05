require('./db/config/index');

const express = require('express'),
  app = express(),
  path = require('path'),
  morgan = require('morgan'),
  cookieSession = require('cookie-session'),
  userRouter = require('./routes/index');


app.set('trust proxy', true)

app.use(express.json());
// Log all requests
app.use(morgan('dev'));
  
//cookie session
app.use(cookieSession({
   signed: true,
   secure: true,
}))

// Unauthenticated routes
app.use('/api/users', userRouter);

  
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})