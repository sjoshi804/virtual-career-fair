// Middleware that checks if user is logged in by validating the token passed if one is passed

import { networkInterfaces } from "os";
import { User } from "../apps/user/user";

const endpointsWithoutAuthentication = 
[
    "/login"
]
const authenticate = (req, res, next) =>
{
    if (!endpointsWithoutAuthentication.includes(req.url))
    {
        if (User.validateToken(req.get("authorization")))
        {
            // User has valid token
            next();
        }
        else
        {
            // Return 401 - indicates unauthorized
            res.status(401);
        }
    }
    else // No need to authenticate
    {
        next();
    }
}

export { authenticate }