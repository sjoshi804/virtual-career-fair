import fs = require("fs");
import express = require("express");
import path = require("path");
var cookieParser = require('cookie-parser');
import logger = require("./middleware/logger")
import config = require("./.config")
import DBClient = require("./db/dbClient");

let port = process.env.PORT || 3000;
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Initialize logger
// app.use(logger);

//Serve react app build if in production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../../client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  });
}

// Initialize DB Connection
DBClient.connect();

const server = app.listen(app.get("port"), () => {
  console.log(`Server is listening on port ${port}`);
});

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

// Close database connection and terminate server gracefully
function shutDown() {
  DBClient.mongoClient.close();
  console.log("Closing db connection")
  server.close(() => {
    console.log('Terminating server');
    process.exit(0);
  });
}

export default server;