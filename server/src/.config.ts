export const production = "production";
export const test = "test";
export const productionDatabaseURL = "";
export const developmentDatabaseURL = "mongodb://localhost:27017";
export const testDatabaseURL = "mongodb://localhost:27017";
export const databaseURL = process.env.NODE_ENV === production ? productionDatabaseURL : process.env.NODE_ENV === test ? testDatabaseURL: developmentDatabaseURL; 
export const testDatabaseName = "jobz-test";
export const databaseName = process.env.NODE_ENV === test ? testDatabaseName: "jobz";
export const tokenSecret = "AaCgjvKjmL";