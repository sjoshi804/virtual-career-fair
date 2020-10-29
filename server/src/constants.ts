const fs = require('fs');
const path = require('path');
const express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
const config = require('./.config.js');
const logger = require('./middleware/logger.js');
const constants = require('./constants');
const MongoClient = require('mongodb').MongoClient;

//Determining port from Heroku config or setting to 3000
let port = process.env.PORT || 3000;

// Routers for apps
var plansRouter = require('./apps/plan/routes.js');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Initialize logger
app.use(logger);

//Connect Plans Routes
app.use('/api/plans', callsRouter);

//Serve react app build if in production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Initialize DB connection and start server
MongoClient.connect(process.env.NODE_ENV === "production" ? config.production.database.url : config.development.database.url, { useUnifiedTopology: true }, function (err, database) {
  if (err) throw err;
  app.db = database.db(constants.dbName)
  // Save database object so the connection can be closed when server terminates.
  app.database = database;
  // Start the application after the database connection is ready
  app.server = app.listen(port);
  console.log(`Express JS server is istening on port ${port}`);
});

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

// Close database connection and terminate server gracefully
function shutDown() {
  app.database.close();
  console.log("Closing db connection")
  app.server.close(() => {
    console.log('Terminating server');
    process.exit(0);
  });
}