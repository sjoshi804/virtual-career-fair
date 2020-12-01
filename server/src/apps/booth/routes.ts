/*
    Routes:
        - POST /careerfair/:careerfairid/company
        - GET/DELETE /careerfair/:careerfairid/company/:companyid

    Base Endpoint Url: /careerfair
*/

import express = require('express');
import { CareerFair } from '../careerfair/careerfair';
import { Booth } from './booth';

const BoothRouter = express.Router();

// Create booth associated with this company
BoothRouter.post("/:careerfairid/company", async (req, res) => {
    const careerfairid = req.params.careerfairid;
    // Get career fair and make sure it exists
    const filterQuery = {
        _id: careerfairid
    }
    var careerfair = await CareerFair.db.findOne(filterQuery);
    if (careerfair != null) {
        // If this company does not already have a booth in this career fair
        if (!(req.body.companyId in careerfair.booths)) {
            // TODO: Validate Company ID to make sure this company exists
            // Create DBSchema object using request body
            const booth = new Booth(null, careerfairid, req.body.companyId);
            careerfair.booths[booth.getCompanyId()] = booth
            const updateQuery = {
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

BoothRouter.get("/:careerfairid/company/:companyid", async (req, res) => {

});

BoothRouter.delete("/:careerfairid/company/:companyid", async (req, res) => {

});

export { BoothRouter };