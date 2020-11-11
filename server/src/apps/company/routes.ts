/*

GET/POST	/company	
GET/UPDATE/DELETE	/company/:companyid	
POST	/company/:companyid/recruiter/:recruiterid	add recruiter to company
GET	/company/:companyid/recruiter	get all recruiters for a given company

*/

import express = require('express');
const CompanyRouter = express.Router();

// Prefix: /company

// Create new Company
CompanyRouter.post("/", async (req, res) =>
{
    res.send({ success: true });
});

// Get all companies 
CompanyRouter.get("/", async (req, res) =>
{
    res.send({ success: true });
});

// Get specific company
CompanyRouter.get("/:companyId", async (req, res) =>
{
    res.send({ success: false });
});


// Update specific company
CompanyRouter.post("/:companyId", async (req, res) =>
{
    res.send({ success: true });
});


// Delete specific company
CompanyRouter.delete("/:companyId", async (req, res) =>
{
    res.status(404).send({ success: true });
});

// Add recruiter to company - POST since changes state
CompanyRouter.post("/:companyid/addRecruiter/:recruiterId", async (req, res) =>
{
    res.send({ success: true });
});

// Get all recruiters for a company
CompanyRouter.get("/:companyId/recruiter", async (req, res) =>
{
    res.status(200).send({ success: true });
});

export { CompanyRouter };