/*

GET/UPDATE/DELETE/POST	/resume/:applicantid	
GET	/resume/:applicantid/insights   Get insights

*/

import express = require('express');
import { Resume } from './resume';
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
    resumeFields.insights = Resume.computeInsights(req.body.skills, req.body.experiences);

    // Tries to save, if save successful return success
    if (await Resume.db.save(resumeFields))
    {
        res.sendStatus(201);
    }
    else // bad request
    {
        res.sendStatus(400); 
    }
});

// Get resume for exisiting applicant or create empty resume if doesnt exist
ResumeRouter.get("/:applicantId", async (req, res) =>
{   
    
    var resume = await Resume.db.findOne({applicantId: req.params.applicantId});
    if(resume != null)
    {
        res.status(200).send(resume);
    }
    else
    {
        var newResume = {
            "applicantId": req.params.applicantId,
            "skills": [],
            "experiences": [],
            "insights": []
        }
        await Resume.db.save(newResume)
        res.status(200).send(newResume);
    }
});

// Update resume for exisiting applicant
ResumeRouter.put("/:applicantId", async (req, res) =>
{
    console.log("Hit")
    res.sendStatus(204);
    // const filterQuery = 
    // {
    //     applicantId: req.params.applicantId
    // }

    // // Check if resume exists for applicant -> if not return 404
    // if (await Resume.db.count(filterQuery) < 1)
    // {
    //     res.sendStatus(404);
    //     return;
    // }

    // var updatedFields = req.body
    // updatedFields.insights = Resume.computeInsights(req.body.skills, req.body.experiences)

    // const updateQuery = 
    // {
    //     $set: updatedFields
    // };

    // if (await Resume.db.updateOne(filterQuery, updateQuery))
    // {
    //     res.sendStatus(204);
        
    //     return;
    // }
    // else
    // {
    //     res.sendStatus(503);
    //     return;
    // }
});

// Delete resume for exisiting applicant
ResumeRouter.delete("/:applicantId", async (req, res) =>
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
    var resume = await Resume.db.findOne({applicantId: req.params.applicantId});
    if(resume != null)
    {
        res.status(200).send(resume.insights);
    }
    else
    {
        res.sendStatus(404);
    }
});

export { ResumeRouter }