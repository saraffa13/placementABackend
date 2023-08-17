const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const studentRoutes = require('./routes/student-routes');

const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());


app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested_With,Content-Type,Accept,Authorization')
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE')
  next();
})

app.use('/api/students', studentRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find thi route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.meshsage || 'An unknown error occurred!'});
});


mongoose
.connect(`mongodb+srv://saraffa:pkaC7d3ALa3mlMSS@cluster0.8ov4v.mongodb.net/placement23?retryWrites=true&w=majority`)
// .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8ov4v.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then(()=>{
  app.listen(process.env.PORT || 5000);
})
.catch(err=>console.log(err));