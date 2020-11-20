/*  
    Routes:
        - GET/POST /recruiter
        - GET/UPDATE/DELETE /recruiter/:userid

    Base Endpoint Url: /recruiter
*/

import express = require('express');
import { Recruiter } from './recruiter';
const RecruiterRouter = express.Router();


// Create New Recruiter
RecruiterRouter.post("/", async (req, res) => {
    if (await Recruiter.db.save(req.body)) {
        // New Resource Created
        res.sendStatus(201);
    } else {
        res.sendStatus(400); 
    }
});


// Get All Recruiters
RecruiterRouter.get("/", async (req, res) => {
    res.status(200).send(await Recruiter.db.findMany({}));
});


// Get Specific Recruiter
RecruiterRouter.get("/:userid", async (req, res) => {
    const filterQuery = {
        _id: req.params.userid,
        userType: 1
    }
    var recruiter = await Recruiter.db.findOne(filterQuery);
    if(recruiter != null) {
        res.status(200).send(recruiter);
    }
    // Did not find item in database
    else {
        res.sendStatus(404);
    }
});


// Update Specific Recruiter
RecruiterRouter.put("/:userid", async (req, res) => {
    const filterQuery = {
        _id: req.params.userid,
        userType: 1
    }
    
    // Make sure only one instance exists in the database
    if (await Recruiter.db.count(filterQuery) != 1) {
        res.sendStatus(404);
        return;
    }

    const updateQuery = {
        $set: req.body
    };

    // Return 200 to indicate successful put request
    if (await Recruiter.db.updateOne(filterQuery, updateQuery)){
        res.sendStatus(204);
        return;
    } 
    // Update likely failed due to syntax error
    else {
        res.sendStatus(400);
        return;
    }
});


// Delete Specific User
RecruiterRouter.delete("/:userid", async (req, res) => {
    const filterQuery = {
        _id: req.params.userid,
        userType: 1
    }

    // Make sure only one instance exists in the database
    if (await Recruiter.db.count(filterQuery) < 1) {
        res.sendStatus(404);
        return;
    }

    if (await Recruiter.db.deleteOne(filterQuery)) {
        res.sendStatus(204);
    }
    // Very likely that there is an internal server error
    else {
        res.sendStatus(500);
    }
});


export { RecruiterRouter };