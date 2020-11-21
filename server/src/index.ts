// External modules
import express = require("express");
import path = require("path");
const cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser');

// Config
import config = require("./.config");

// Core modules
import { DBClient } from "./db/dbClient";
import { logger } from "./middleware/logger";

// Socket Protocols
import { CareerFairSocketProtocol } from "./apps/socket/careerFairSocketProtocol";

// Routers
import { MeetingNotesRouter } from "./apps/meetingNotes/routes";
import { CompanyRouter } from "./apps/company/routes";
import { JobRouter } from "./apps/job/routes";
import { ResumeRouter } from "./apps/resume/routes";
import { UserRouter } from "./apps/user/routes";
import { ApplicantRouter } from "./apps/user/applicant/routes";
import { RecruiterRouter } from "./apps/user/recruiter/routes";
import { OrganizerRouter } from "./apps/user/organizer/routes";

// Express configuration
let port = process.env.PORT || 3000;
const app = express();
app.options('*:*', cors());
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Initialize logger if non test environment (avoid cluttering stdout due to many API requests in test)
if (process.env.NODE_ENV != config.test) {
  app.use(logger);
}

// Connect Base Endpoints to Routers
app.use("/company", CompanyRouter);
app.use("/company", JobRouter);
app.use("/resume", ResumeRouter);
app.use("/meetingNotes", MeetingNotesRouter);
app.use("/user", UserRouter);
app.use("/applicant", ApplicantRouter);
app.use("/recruiter", RecruiterRouter);
app.use("/organizer", OrganizerRouter);

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

// Register socket protocols
const careerFairSocketProtocol = CareerFairSocketProtocol.getOrCreate();
careerFairSocketProtocol.registerEventListeners(io.of('/careerFair'));

// Start listening on server
server.listen(app.get("port"), () => {
  console.log(`Server is listening on port ${port}`);
});

// Register signal handlers
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

// Export server object for testing purposes
export default server;