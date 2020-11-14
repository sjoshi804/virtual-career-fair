/*

GET/UPDATE/DELETE/POST	/resume/:applicantid	
GET	/resume/:applicantid/insights   Get insights

*/

import express = require('express');
import { Resume } from './resume';
import { Experience } from './experience'
import {Applicant} from '../user/applicant';
const ResumeRouter = express.Router();

// Prefix: /resume

// Create new Resume for exisiting applicant
ResumeRouter.post("/:applicantId", async (req, res) =>
{

    const filterQuery = 
    {
        applicantId: req.params.applicantId
    }

    // TODO: Check if applicant exists -> if not return 404
    // Waiting for applicant db to be defined

    var resumeFields = req.body
    var resume = new Resume(resumeFields.applicantId, resumeFields.skills, resumeFields.experiences as Experience[])
    resume.computeInsights()

    // Tries to save, if save successful return success
    if (await Resume.db.save(resume))
    {
        res.sendStatus(201);
    }
    else // bad request
    {
        res.sendStatus(400); 
    }
});

// Get resume for exisiting applicant
ResumeRouter.get("/:applicantId", async (req, res) =>
{
    var resume = await Resume.db.findOne({_id: req.params.applicantId});
    if(resume != null)
    {
        res.status(200).send(resume);
    }
    else
    {
        res.sendStatus(404);
    }
});

// Update resume for exisiting applicant
ResumeRouter.put("/:applicantId", async (req, res) =>
{
    const filterQuery = 
    {
        applicantId: req.params.applicantId
    }

    // Check if resume exists for applicant -> if not return 404
    if (await Resume.db.count(filterQuery) < 1)
    {
        res.sendStatus(404);
        return;
    }

    var updatedFields = req.body
    var resume = new Resume(req.params.applicantId, updatedFields.skills, updatedFields.experiences as Experience[])
    resume.computeInsights()

    const updateQuery = 
    {
        $set: resume
    };

    if (await Resume.db.updateOne(filterQuery, updateQuery))
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

// Delete resume for exisiting applicant
ResumeRouter.delete("/:applicantId", async (req, res) =>
{
    const filterQuery = 
    {
        applicantId: req.params.appicantId
    }

    // Check if resume exists for applicant -> if not return 404
    if (await Resume.db.count(filterQuery) < 1)
    {
        res.sendStatus(404);
        return;
    }

    if (await Resume.db.deleteOne(filterQuery))
    {
        res.sendStatus(204);
    }
    else // internal server error assumed
    {
        res.sendStatus(503);
    }
});

// Get resume insights for exisiting applicant
ResumeRouter.get("/:applicantId/insights", async (req, res) =>
{
    var resume = await Resume.db.findOne({_id: req.params.applicantId});
    if(resume != null)
    {
        res.status(200).send(resume.insights);
    }
    else
    {
        res.sendStatus(404);
    }
});