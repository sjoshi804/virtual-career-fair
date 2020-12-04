/*

GET/POST	/company	
GET/UPDATE/DELETE	/company/:companyid	
POST	/company/:companyid/recruiter/:recruiterid	add recruiter to company
GET	/company/:companyid/recruiter	get all recruiters for a given company

*/

import express = require('express');
import { Recruiter } from '../user/recruiter/recruiter';
import { User } from '../user/user';
import { Company } from './company';
const CompanyRouter = express.Router();
import { v4 as uuid } from 'uuid';

// Prefix: /company

// Create new Company
CompanyRouter.post("/", async (req, res) =>
{
    req.body._id = uuid();
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
CompanyRouter.post("/:companyId/addRecruiter/:recruiterId", async (req, res) => {

        // Get company
        const filterQuery = {
            _id: req.params.companyId
        }
        var company = await Company.db.findOne(filterQuery);
        if (company != null) {
            // Check if recruiter exists in db
            var recruiterId = req.params.recruiterId
            const filterQuery = {
                _id: recruiterId
            }
            var applicant = await User.db.findOne(filterQuery);
            if (applicant != null) {
                // Check if recruiter is already associated with company
                var recruiters = company.recruiters;
                if (!recruiters.includes(recruiterId)) {

                    company.recruiters.push(recruiterId);

                    // Update company in DB
                    const updateQuery = {
                        $set: company
                    };
                    const filterQuery = {
                        _id: req.params.companyId
                    }
                    // Return 204 to indicate successful put request
                    if (await Company.db.updateOne(filterQuery, updateQuery)) {
                        res.sendStatus(204);
                        return;
                    } 
                    // Update failed so return 500
                    else {
                        res.sendStatus(500);
                        return;
                    }
                }
            } 
            // Could not find applicant 
            else {
                res.sendStatus(404);
            }
        }
        // Couldn't find the Company
        else {
            res.sendStatus(404);
        }
});

// Get all recruiters for a company
CompanyRouter.get("/:companyId/recruiter", async (req, res) =>
{
    // Get company
    const filterQuery = {
        _id: req.params.companyId
    }

    var company = await Company.db.findOne(filterQuery);

    if (company != null) {
        res.status(200).send(company.recruiters);
    }
    // Couldn't find the Company
    else {
        res.sendStatus(404);
    }

});

export { CompanyRouter };