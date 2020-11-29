/*
    Routes:
        - GET/POST /careerfair
*/

import express = require('express');
import { CareerFair } from './CareerFair';
const CareerFairRouter = express.Router();

// Get All CareerFairs
CareerFairRouter.get("/", async (req, res) => {
    console.log("Request received");
    res.status(200).send(await CareerFair.db.findMany({}));
});

CareerFairRouter.post("/", async (req, res) => {
    if (await CareerFair.db.save(req.body)) {
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
});

export { CareerFairRouter };
