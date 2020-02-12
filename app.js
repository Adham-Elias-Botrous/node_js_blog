require('dotenv').config();

var express = require('express');

var path = require('path');
var logger = require('morgan');
const createError = require('http-errors');

const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const registerRouter = require('./routes/register');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/register', registerRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);

// ---
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), err => {
    if (err) next(err);
  });
});
// ----

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  if (
    err.name == 'MongoError' ||
    err.name == 'ValidationError' ||
    err.name == 'CastError'
  ) {
    err.status = 422;
  }

  res
    .status(err.status || 500)
    .json({ message: err.message || 'some error occurred.' });
});

mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  err => {
    if (err) throw err;
    console.log('connected successully');
  }
);

module.exports = app;
