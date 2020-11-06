import express = require('express');
import { User } from './user';

const UserRouter = express.Router();

/* Need to add app.user('/user', UserRouter); in index.ts */

// Create user endpoint
UserRouter.post('/createUser', function(req, res) {
    //Access db using req.app.database
});

// Update name for a particular user
UserRouter.post('/:emailid/updateUser', function(req, res) {
    
});

// Login
UserRouter.post('/:emailid/login', function(req, res){

});

// Logout
UserRouter.get('/:emailid/logout', function(req, res){

});

export { UserRouter };