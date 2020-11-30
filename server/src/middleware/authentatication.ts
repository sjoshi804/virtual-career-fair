// Middleware that checks if user is logged in by validating the token passed if one is passed

import { User } from "../apps/user/user";

const logPrefix = "AUTH:"

const endpointsWithoutAuthentication = 
[
    "/login"
]

const authenticate = async (req, res, next) =>
{
    if (!endpointsWithoutAuthentication.includes(req.url))
    {
        const authToken = req.header("Authorization").replace("Bearer ", "");
        if (await User.validateToken(authToken))
        {
            console.log(`${logPrefix} User has been authenticated -> forwarding to appropriate route`);
            // User has valid token
            next();
        }
        else
        {
            console.log(`${logPrefix} \n\tInvalid or missing token \n\tToken: ${authToken} \n\tUnauthorized 401`);
            // Return 401 - indicates unauthorized
            res.sendStatus(401);
        }
    }
    else // No need to authenticate
    {
        console.log(`${logPrefix} No need to authenticate this endpoint`)
        next();
    }
}

export { authenticate }