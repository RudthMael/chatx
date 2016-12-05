// Configure dotenv
import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';

// Files from the app
import initializeDb from './db';
import middleware from './middleware';
import apiV1 from './api/v1';
import config from './config.json';
import './passport';

let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
}));

app.use(bodyParser.json({
  limit : config.bodyLimit
}));

// connect to db
initializeDb(() => {
  // internal middleware
  app.use(middleware({ config }));
  app.use(passport.initialize());

  // api router
  app.use('/api/v1', apiV1({ config }));

  // Error middleware
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ 'error' : `${err.name}: ${err.message}` });
    }

    next();
  });

  app.server.listen(process.env.PORT || config.port);

  console.log(`Started on port ${app.server.address().port}`);
});

export default app;
