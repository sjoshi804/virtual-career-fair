/*

GET/POST	/company	
GET/UPDATE/DELETE	/company/:companyid	
POST	/company/:companyid/recruiter/:recruiterid	add recruiter to company
GET	/company/:companyid/recruiter	get all recruiters for a given company

*/

import express = require('express');
import { Recruiter } from '../user/recruiter/recruiter';
import { Company } from './company';
const CompanyRouter = express.Router();

// Prefix: /company

// Create new Company
CompanyRouter.post("/", async (req, res) =>
{
    // Tries to save, if save successful return success
    if (await Company.db.save(req.body))
    {
        res.sendStatus(201);
    }
    else // bad request
    {
        res.sendStatus(400); 
    }

    
});

// Get all companies 
CompanyRouter.get("/", async (req, res) =>
{
    res.status(200).send(await Company.db.findMany({}));
});

// Get specific company
CompanyRouter.get("/:companyId", async (req, res) =>
{
    var company = await Company.db.findOne({_id: req.params.companyId});
    if(company != null) // Expect db to return null if none found
    {
        res.status(200).send(company);
    }
    else
    {
        res.sendStatus(404);
    }
});


// Update specific company
CompanyRouter.put("/:companyId", async (req, res) =>
{
    const filterQuery = 
    {
        _id: req.params.companyId
    }

    // Check if company exists -> if not return 404
    if (await Company.db.count(filterQuery) < 1)
    {
        res.sendStatus(404);
        return;
    }

    const updateQuery = 
    {
        $set: req.body
    };

    if (await Company.db.updateOne(filterQuery, updateQuery))
    {
        res.sendStatus(204);
        return;
    }
    else
    {
        res.sendStatus(503);
        return;
    }
});


// Delete specific company
CompanyRouter.delete("/:companyId", async (req, res) => {
    const filterQuery = {
        _id: req.params.companyId
    }

    // Check if company exists -> if not return 404
    if (await Company.db.count(filterQuery) < 1) {
        res.sendStatus(404);
        return;
    }

    if (await Company.db.deleteOne(filterQuery)) {
        res.sendStatus(204);
    }
    else // internal server error assumed
    {
        res.sendStatus(503);
    }
});

// Add recruiter to company - POST since changes state
CompanyRouter.post("/:companyid/addRecruiter/:recruiterId", async (req, res) => {
    
    // const recruiterFilterQuery = {
    //     _id: req.params.recruiterId,
    //     userType: 1
    // }

    // const companyFilterQuery = {
    //     _id: req.params.companyid
    // }

    // // Check if Recruiter exists -> if not return 404
    // if (await Recruiter.db.count(recruiterFilterQuery) < 1) {
    //     res.sendStatus(404);
    //     return;
    // }

    // // Check if Company exists -> if not return 404
    // if (await Company.db.count(companyFilterQuery) < 1) {
    //     res.sendStatus(404);
    //     return;
    // }

    // // Get company
    // var company = await Company.db.findOne(companyFilterQuery);
    // if (company.recruiters.indexOf(recrui))
    // company.recruiters.push()

    res.sendStatus(403);
});

// Get all recruiters for a company
CompanyRouter.get("/:companyId/recruiter", async (req, res) =>
{
    //TODO: Waiting on recruiter db schema object
    res.sendStatus(403);
});

export { CompanyRouter };