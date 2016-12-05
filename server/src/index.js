import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import apiV1 from './api/v1';
import config from './config.json';
import dotenv from 'dotenv';

// Configure dotenv
dotenv.config();

let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
  limit : config.bodyLimit
}));

// connect to db
initializeDb(() => {
  // internal middleware
  app.use(middleware({ config }));

  // api router
  app.use('/api/v1', apiV1({ config }));

  app.server.listen(process.env.PORT || config.port);

  console.log(`Started on port ${app.server.address().port}`);
});

export default app;
