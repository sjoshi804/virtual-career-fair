export const production = ""
export const databaseURL = process.env.NODE_ENV === "production" ? "" : "mongodb://localhost:27017";
export const databaseName = "jobz-main";