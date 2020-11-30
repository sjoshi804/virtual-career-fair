/*
    Routes:
        - POST /careerfair/:careerfairid/company
        - GET/UPDATE/DELETE /careerfair/:careerfairid/company/:companyid
*/

import express = require('express');
import { CareerFair } from '../careerFair/careerFair';
import { Booth } from './booth';

const BoothRouter = express.Router();

BoothRouter.post('/:careerfairid/company', async (req, res) => {

});

BoothRouter.get('/:careerfairid/company/:companyid', async (req, res) => {

});

BoothRouter.put('/:careerfairid/company/:companyid', async (req, res) => {

});

BoothRouter.delete('/:careerfairid/company/:companyid', async (req, res) => {
    
});

export { BoothRouter };