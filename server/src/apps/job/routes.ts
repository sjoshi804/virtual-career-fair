import express = require('express');
import { Job } from './job';
const JobRouter = express.Router();

// Prefix: /company

// Create new Job
JobRouter.post("/:companyId/job", async (req, res) =>
{
    // Tries to save, if save successful return success
    if (await Job.db.save(req.body))
    {
        res.sendStatus(201);
    }
    else // bad request
    {
        res.sendStatus(400); 
    }

    
});