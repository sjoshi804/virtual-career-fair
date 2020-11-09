/*

GET/POST	/company	
GET/UPDATE/DELETE	/company/:companyid	
POST	/company/:companyid/recruiter/:recruiterid	add recruiter to company
GET	/company/:companyid/recruiter	get all recruiters for a given company

*/

import express = require('express');
import { Company } from './company';
const CompanyRouter = express.Router();

// Prefix: /company

// Create new Company
CompanyRouter.post("/", async (req, res) =>
{
    res.send({ success: true });
});

// Get all companies 


// Get specific company

// Update specific company

// Delete specific company

// Add recruiter to company - POST since changes state

// Get all recruiters for a company