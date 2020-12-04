/*
    Routes:
        - GET/POST /careerfair
        - GET/POST/DELETE /careerfair/:careerfairid
        - POST /careerfair/:careerfairid/registerApplicant/:applicantid
        - GET /careerfair/:careerfairid/company

    Base Endpoint Url: /careerfair
*/

import express = require('express');
import { CareerFair } from './careerFair';
import { User } from '../user/user';
import { Company } from '../company/company';
import { Organizer } from '../user/organizer/organizer';
import { v4 as uuid } from 'uuid';

const CareerFairRouter = express.Router();

// Get All CareerFairs
CareerFairRouter.get("/", async (req, res) => {
    // Get all career fairs
    var careerfairs = await CareerFair.db.findMany({});

    // For each career fair, look up the name from the user
    // table using the organizer id
    for (let careerfair of careerfairs)
    {
        // Get organizer
        const filterQuery = {
            _id: careerfair.organizer
        };
        var organizer = await Organizer.db.findOne(filterQuery);
        
        if (organizer != null) {
           careerfair.organizer = organizer.userData.affiliatedOrganization; 
        }
    }

    res.status(200).send(careerfairs);
});

// Create Career Fair
CareerFairRouter.post("/", async (req, res) => {
    req.body._id = uuid();
    if (await CareerFair.db.save(req.body)) {
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
});

// Get specific careerf fair
CareerFairRouter.get("/:careerfairid", async (req, res) => {
    const filterQuery = {
        _id: req.params.careerfairid
    }
    var careerfair = await CareerFair.db.findOne(filterQuery);
    if (careerfair != null) {
        // Get name
        const filterQuery = {
            _id: careerfair.organizer
        };
        var organizer = await Organizer.db.findOne(filterQuery);
        
        if (organizer != null) {
           careerfair.organizer = organizer.userData.affiliatedOrganization; 
        }
        res.status(200).send(careerfair);
    } 
    // Did not find item in db
    else {
        res.sendStatus(404);
    }
});

// Update specific careerfair
CareerFairRouter.put("/:careerfairid", async (req, res) => {
    const filterQuery = {
        _id: req.params.careerfairid
    }

    // Ensure there is only instance in the database
    if (await CareerFair.db.count(filterQuery) < 1) {
        res.sendStatus(404);
        return;
    }

    const updateQuery = {
        $set: req.body 
    };

    // Return 204 to indicate successful put request
    if (await CareerFair.db.updateOne(filterQuery, updateQuery)) {
        res.sendStatus(204);
        return;
    } 
    // Update failed so return 500
    else {
        res.sendStatus(500);
        return;
    }
});

// Delete specific careerfair
CareerFairRouter.delete("/:careerfairid", async (req, res) => {
    const filterQuery = {
        _id: req.params.careerfairid
    }

    // Make sure only one instance is in the db
    if (await CareerFair.db.count(filterQuery) < 1){
        res.sendStatus(404);
        return;
    }

    if (await CareerFair.db.deleteOne(filterQuery)) {
        res.sendStatus(204);
        return;
    }

    // Very likely that there is an internal server error
    else {
        res.sendStatus(500);
        return;
    }
});

// Add applicant to career fair
CareerFairRouter.post("/:careerfairid/registerApplicant/:applicantid", async (req, res) => {
    // Get career fair
    const filterQuery = {
        _id: req.params.careerfairid
    }
    var careerfair = await CareerFair.db.findOne(filterQuery);
    if (careerfair != null) {
        // Check if applicant exists in the database
        var applicantid = req.params.applicantid;
        const filterQuery = {
            _id: applicantid
        }
        var applicant = await User.db.findOne(filterQuery);
        if (applicant != null) {
            // Check if applicant is already registered
            var applicants = careerfair.attendingApplicants;
            if (!applicants.includes(applicantid)) {
                careerfair.attendingApplicants.push(applicantid);
                // Update career fair in DB
                const updateQuery = {
                    $set: careerfair
                };
                const filterQuery = {
                    _id: req.params.careerfairid
                }
                // Return 204 to indicate successful put request
                if (await CareerFair.db.updateOne(filterQuery, updateQuery)) {
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
    // Couldn't find the Career Fair
    else {
        res.sendStatus(404);
    }
});

// Get all companies associated with this career fair
CareerFairRouter.get("/:careerfairid/company", async (req, res) => {
    // Get career fair
    const filterQuery = {
        _id: req.params.careerfairid
    }
    var careerfair = await CareerFair.db.findOne(filterQuery);
    // Make sure career fair exists
    if (careerfair != null) {
        // Ensure there is a valid object
        if (careerfair.booths) {
            var companyIds = [];
            // Get all company Ids in map
            for (var companyId in careerfair.booths) {
                companyIds.push(companyId);
            }
            // Get all matching companies in one go
            const companyQuery = {
                _id: {
                    $in: companyIds
                }
            }
            var companies = await Company.db.findMany(companyQuery);
            res.status(200).send(companies);
        } else {
            // Send empty object
            res.status(200).send({});
        }
    }
    // Career fair doesn't exist so return error
    else {
        res.sendStatus(404);
        return;
    }
});

export { CareerFairRouter };
