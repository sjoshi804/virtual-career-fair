// Middleware that checks if user is logged in by validating the token passed if one is passed

import { User } from "../apps/user/user";

const logPrefix = "^ AUTH:"

//TODO: Prevent anyone but client from sending a request to login
// Make sure to always append / to endpoint
const endpointsWithoutAuthentication = 
{
    "/api/user/login/"              : ["POST"],
    "/api/user/initiateLogin/"      : ["POST"],
    "/api/applicant/"               : ["POST"],
    "/api/recruiter/"               : ["POST"],
    "/api/organizer/"               : ["POST"],
    "/api/company/"                 : ["GET"],
    "/api/careerFair/"              : ["GET"],
    "/api/company/:companyId/job/"  : ["GET"]
}

// Checks if endpoint should be authenticated for a given method
const shouldAuthenticateEndpoint = (endpoint, httpMethod) =>
{
    // Ensure url ends with /
    if (endpoint.slice(-1) != "/")
    {
        endpoint += "/";
        // FIXME: Make less hacky
        if (endpoint.startsWith("/api/company") && endpoint.slice(-5) == "/job/")
        {
            
            endpoint = "/api/company/:companyId/job/";
        }
    }

    // Check if endpoint in dict for authentication less endpoints
    if (endpointsWithoutAuthentication[endpoint] != undefined)
    {
        return !endpointsWithoutAuthentication[endpoint].includes(httpMethod);
    }
    else
    {
        return true;
    }
}

const authenticate = async (req, res, next) =>
{
    if (shouldAuthenticateEndpoint(req.originalUrl, req.method))
    {
        var authToken = req.header("Authorization")
        if (authToken !== undefined)
        {
            authToken = authToken.replace("Bearer ", "").replace("Basic ", "");
        }

        if (authToken !== undefined && await User.validateToken(authToken))
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