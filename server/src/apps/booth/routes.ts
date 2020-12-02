/*
    Routes:
        - POST /careerfair/:careerfairid/company
        - GET/DELETE /careerfair/:careerfairid/company/:companyid

    Base Endpoint Url: /careerfair
*/

import express = require('express');
import { CareerFair } from '../careerfair/careerfair';
import { CareerFairDBSchema } from '../careerFair/careerFairDBSchema';
import { User } from '../user/user';
import { Booth } from './booth';
import { BoothDBSchema } from './boothDBSchema';

const BoothRouter = express.Router();

// Create booth associated with this company
BoothRouter.post("/:careerfairid/company", async (req, res) => {
    const careerfairid = req.params.careerfairid;
    const companyId = req.body.companyId;

    // Get career fair and make sure it exists
    const filterQuery = {
        _id: careerfairid
    }
    var careerfair = await CareerFair.db.findOne(filterQuery);
    if (careerfair != null) {
        // If this company does not already have a booth in this career fair
        if (careerfair.booths == null)
        {
            careerfair.booths = new Map<string, Booth>();
        }
        if (!(companyId in careerfair.booths)) {
            // TODO: Validate Company ID to make sure this company exists
            // Create DBSchema object using request body
            const booth = new Booth(null, careerfairid, companyId);
            careerfair.booths[companyId] = booth
            const updateQuery = 
            {
                $set: careerfair
            }
            // Return resource created code
            if (await CareerFair.db.updateOne(filterQuery, updateQuery)) {
                res.sendStatus(201);
                return;
            } else {
                res.sendStatus(500);
                return;
            }
        }
        // Resource already exists
        else {
            res.sendStatus(409);
        }
    } 
    // Else career fair could not be found so there is an error
    else {
        res.sendStatus(404);
    }
});

BoothRouter.get("/:careerfairid/company/:companyId", async (req, res) => {
    const careerfairid = req.params.careerfairid;
    // Get career fair and make sure it exists
    const filterQuery = 
    {
        _id: careerfairid
    }

    const count = await CareerFair.db.count(filterQuery);
    if (count > 0) 
    {
        const careerFair = await CareerFair.getLiveCareerFair(careerfairid);
        if (careerFair.booths.hasOwnProperty(req.params.companyId) || careerFair.booths.has(req.params.companyId))
        {
            const numInQueue = careerFair.booths[req.params.companyId].queue.getLength();
            const applicantId = User.getDataFromToken(req.header("Authorization")).id;
            const applicantInQueue = careerFair.booths[req.params.companyId].queue.isApplicantInQueue(applicantId);
            const positionInQueue = careerFair.booths[req.params.companyId].queue.getPosition(applicantId)
            res.send(
                {
                    numInQueue: numInQueue,
                    position: applicantInQueue? positionInQueue : null
                }
            )
        }
    }
    else 
    {
        res.sendStatus(404);
    }
});

BoothRouter.delete("/:careerfairid/company/:companyid", async (req, res) => {
    const careerfairid = req.params.careerfairid;
    
    // Get career fair and make sure it exists
    const filterQuery = {
        _id: careerfairid
    }
    var careerfair = await CareerFair.db.findOne(filterQuery);
    if (careerfair != null) {
        if ( ! (req.params.companyid in careerfair.booths) ) {
            res.sendStatus(404);
        }
        else {
            delete careerfair.booths[req.params.companyid]

            const updateQuery = {
                $set: careerfair
            }
            
            if (await CareerFair.db.updateOne(filterQuery, updateQuery)) {
                res.sendStatus(201);
                return;
            } else {
                res.sendStatus(500);
                return;
            }
        }
    }
    else {
        res.sendStatus(404);
    }
});

export { BoothRouter };