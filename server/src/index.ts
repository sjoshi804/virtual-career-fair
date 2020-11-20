import fs = require("fs");
import express = require("express");
import path = require("path");
var cookieParser = require('cookie-parser');
import config = require("./.config");
import { DBClient } from "./db/dbClient";
import { MeetingNotesRouter } from "./apps/meeting/routes";
import { CompanyRouter } from "./apps/company/routes";
import { logger } from "./middleware/logger";
import { CareerFairSocketProtocol } from "./apps/socket/careerFairSocketProtocol";
const cors = require('cors');
const app = require('express')();
const http = require('http');
app.options('*:*', cors());

let port = process.env.PORT || 3000;

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Initialize logger if non test environment (avoid cluttering stdout due to many API requests in test)
if (process.env.NODE_ENV != config.test)
{
  app.use(logger);
}

// Connect Routers
app.use("/meetingNotes", MeetingNotesRouter);
app.use("/company", CompanyRouter);

// Connect Routers
app.use("/meetingNotes", MeetingNotesRouter);

//Serve react app build if in production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../../client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  });
}

// Initialize a db connection
DBClient.connect();

// Start server
var server = http.createServer(app);
var io = require('socket.io')(server,
  {
    origin: "*:*"
  }
);
const careerFairSocketProtocol = CareerFairSocketProtocol.getOrCreate();
careerFairSocketProtocol.registerEventListeners(io.of('/careerFair'));
/*
io.on('connection', 
  socket =>
  {
      // Handle connection
      console.log("Server: connected.");
      
      // Register disconnection event
      socket.on('disconnect', () => console.log("Server: disconnected."));
      
      // Register echo event
      socket.on("echo", (message) =>
      {
          console.log("Client sent: " + message);
          socket.emit("echo", message);
          console.log("Sent " + message);
      });
  }
);
*/


server.listen(app.get("port"), () => {
  console.log(`Server is listening on port ${port}`);
});

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

// Close database connection and terminate server gracefully
function shutDown() {
  DBClient.close();
  console.log("Closing db connection")
  server.close(() => {
    console.log('Terminating server');
    process.exit(0);
  });
}

export default server;