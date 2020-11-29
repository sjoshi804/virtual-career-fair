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
import { Organizer } from '../user/organizer/organizer';
const CareerFairRouter = express.Router();

// Get All CareerFairs
CareerFairRouter.get("/", async (req, res) => {
    
    // Get all career fairs
    var careerfairs = await CareerFair.db.findMany({});

    // For each career fair, look up the name from the user
    // table using the organizer id
    (careerfairs).forEach(async (careerfair) => {
        // Get organizer
        const filterQuery = {
            _id: careerfair.organizer
        };
        var organizer = await Organizer.db.findOne(filterQuery);
        if (organizer != null) {
           careerfair.organizer = organizer.userData.affiliatedOrganization; 
        }
    });

    res.status(200).send(careerfairs);
});

// Create Career Fair
CareerFairRouter.post("/", async (req, res) => {
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


// 
CareerFairRouter.post("/:careerfairid/registerApplicant/:applicantid", async (req, res) => {

});

// Get all companies associated with this career fair
CareerFairRouter.get("/:careerfairid/company", async (req, res) => {
    
});

export { CareerFairRouter };
