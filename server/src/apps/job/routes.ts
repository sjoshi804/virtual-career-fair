import express = require('express');
import { Company } from '../company/company'
const JobRouter = express.Router();
// Prefix: /company

// Create new Job
JobRouter.post("/:companyId/job", async (req, res) =>
{   
    // TODO: Check for duplicate jobs
    const filterQuery = 
    {
        _id: req.params.companyId
    }

    const addJobQuery = 
    {
        $push: {"jobs": req.body}
    }

    if (await Company.db.count(filterQuery) < 1)
    {
        res.sendStatus(404);
        return;
    }
    
    if (await Company.db.updateOne(filterQuery, addJobQuery))
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

// Get all Jobs
JobRouter.get("/:companyId/job", async (req, res) => {
    const filterQuery = 
    {
        _id: req.params.companyId
    }
    
    // Check if company exists
    var company = await Company.db.findOne(filterQuery);
    if (company == null) {
        res.sendStatus(404);
    }
    else {
        // Send all jobs
        if (company.jobs == undefined)
        {
            res.status(200).send([]);
        }
        else
        {
            res.status(200).send(company.jobs);
        }
    }
})

// Get a specific job
JobRouter.get("/:companyId/job/:jobId", async (req, res) => 
{
    const filterQuery = 
    {
        _id: req.params.companyId,
        "jobs._id": req.params.jobId 
    }

    // Check if company exists
    var company = await Company.db.findOne(filterQuery);
    if (company == null) {
        res.sendStatus(404);
        return;
    }
    
    // not sure if you can just query for single array elem
    company.jobs.forEach(job => {
        if (job._id === req.params.jobId) {
            res.status(200).send(job);
            return;
        }
    })
});

// Update a specific job
JobRouter.put("/:companyId/job/:jobId", async (req, res) =>
{
    const filterQuery = 
    {
        _id: req.params.companyId,
        "jobs._id": req.params.jobId 
    }

    // Check if company exists
    var company = await Company.db.findOne(filterQuery);
    
    if (company == null) {
        res.sendStatus(404);
        return;
    }

    const updateQuery = 
    {
        $set: {"jobs.$": req.body}
    }
    
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

// Delete a specific job
JobRouter.delete("/:companyId/job/:jobId", async (req, res) =>
{
    const filterQuery = 
    {
        _id: req.params.companyId,
        "jobs._id": req.params.jobId 
    }

    // Check if company exists
    var company = await Company.db.findOne(filterQuery);
    
    if (company == null) {
        res.sendStatus(404);
        return;
    }

    const updateQuery = 
    {
        $pull: {"jobs": {"_id": req.params.jobId}}
    }

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


// Add applicantId to job
JobRouter.post("/:companyId/job/:jobId/apply/:applicantId", async (req, res) =>
{   
    const filterQuery = 
    {
        _id: req.params.companyId,
        "jobs._id": req.params.jobId 
    }

    // Check if company exists
    var company = await Company.db.findOne(filterQuery);
    if (company == null) {
        res.sendStatus(404);
        return;
    }

    const updateQuery = 
    {
        $push: {"jobs.$.applicantIds": req.params.applicantId}
    }
    
    if (await Company.db.updateOne(filterQuery, updateQuery))
    {
        res.sendStatus(201);
        return;
    }
    else
    {
        res.sendStatus(503);
        return;
    }
});

JobRouter.post("/:companyId/job/:jobId/withdraw/:applicantId", async (req, res) =>
{   
    const filterQuery = 
    {
        _id: req.params.companyId,
        "jobs._id": req.params.jobId 
    }

    // Check if company exists
    var company = await Company.db.findOne(filterQuery);
    
    if (company == null) {
        res.sendStatus(404);
        return;
    }

    const updateQuery = 
    {
        $pull: {"jobs.$.applicantIds": req.params.applicantId}
    }

    if (await Company.db.updateOne(filterQuery, updateQuery))
    {
        res.sendStatus(201);
        return;
    }
    else
    {
        res.sendStatus(503);
        return;
    }
});

export { JobRouter }