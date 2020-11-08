export const production = ""
export const productionDatabaseURL = "";
export const developmentDatabaseURL = "mongodb://localhost:27018";
export const databaseURL = process.env.NODE_ENV === production ? productionDatabaseURL : developmentDatabaseURL;
export const databaseName = "jobz";
export const tokenSecret = "AaCgjvKjmL";
