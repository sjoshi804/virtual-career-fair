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
import { authenticate } from "./middleware/authentatication"

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
import { CareerFairRouter } from "./apps/careerFair/routes";

// Express configuration
let port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Initialize middleware if not in test environment
if (process.env.NODE_ENV != config.test) {
  app.use(authenticate);
  app.use(logger);
}

// Connect Base Endpoints to Routers
app.use("/api/company", CompanyRouter);
app.use("/api/company", JobRouter);
app.use("/api/resume", ResumeRouter);
app.use("/api/meetingNotes", MeetingNotesRouter);
app.use("/api/user", UserRouter);
app.use("/api/applicant", ApplicantRouter);
app.use("/api/recruiter", RecruiterRouter);
app.use("/api/organizer", OrganizerRouter);
app.use("/api/careerfair", CareerFairRouter);

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