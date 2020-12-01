/*  
    Routes:
        - POST /user/login

    Base Endpoint Url: /user
*/

import express = require('express');
import { User } from './User';
const UserRouter = express.Router();

// Client sends request indicating successful login, return valid token
UserRouter.post("/login", async (req, res) => {

    const filterQuery = {
        email: req.body.email
    }
    
    // Check if user exists in the database
    var user = await User.db.findOne(filterQuery);
    
    if (user != null) 
    {
        // Instantiate User Object
        let currentUser = new User(user.userType, user.name, user.email,
                                 user.password);

        // Send token
        var token = currentUser.getToken();
        res.status(200).send(
            {
                token: token
            });
    }
    // Did not find the item in the database
    else {
        res.sendStatus(404);
    }
});

// Client requesting hashed password to authenticate user on frontend
UserRouter.post("/initiateLogin", async (req, res) => {

    const filterQuery = {
        email: req.body.email
    }
    
    // Check if user exists in the database
    var user = await User.db.findOne(filterQuery);
    
    if (user != null) 
    {
        // Send hash of password
        res.status(200).send(
            {
                hashedPassword: user.password
            });
    }
    // Did not find the item in the database
    else {
        res.sendStatus(404);
    }
});


export { UserRouter };