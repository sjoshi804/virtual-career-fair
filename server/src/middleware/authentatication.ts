// Middleware that checks if user is logged in by validating the token passed if one is passed

import { should } from "chai";
import { User } from "../apps/user/user";

const logPrefix = "AUTH:"

// Make sure to always append / to endpoint
const endpointsWithoutAuthentication = 
[
    "/user/login/",
    "/applicant/",
    "/recruiter/",
    "/organizer/"
]

// Ensures endpoints have slash appended for comparison with endpointsWithoutAuthentication
const shouldAuthenticateEndpoint = (endpoint) =>
{
    if (endpoint.slice(-1) == "/")
    {
        return endpointsWithoutAuthentication.includes(endpoint);
    }
    else
    {
        return endpointsWithoutAuthentication.includes(endpoint + "/");
    }
}

const authenticate = async (req, res, next) =>
{
    if (!(shouldAuthenticateEndpoint(req.originalUrl) && req.method == "POST"))
    {
        console.log(req.method, req.url, req.originalUrl);
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