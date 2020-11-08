export const production = ""
export const productionDatabaseURL = "";
export const developmentDatabaseURL = "mongodb://localhost:27018";
export const databaseURL = process.env.NODE_ENV === production ? productionDatabaseURL : developmentDatabaseURL; // need to add node env = test
export const databaseName = "jobz";
export const testDatabaseName = "jobz-test";
export const tokenSecret = "AaCgjvKjmL";
