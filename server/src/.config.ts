export const production = ""
export const databaseURL = process.env.NODE_ENV === "production" ? "" : "mongodb://localhost:27017";