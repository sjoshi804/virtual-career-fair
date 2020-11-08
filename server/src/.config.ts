export const production = ""
export const databaseURL = process.env.NODE_ENV === production ? "" : "mongodb://localhost:27018";
export const databaseName = "jobz";
export const tokenSecret = "AaCgjvKjmL";
