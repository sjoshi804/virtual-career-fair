/*
    Constant base URL to be changed as needed for Heroku deploymnt
*/ 

const domainName = "localhost:3000";

export const baseUrl = "http://" + domainName + "/api";
export const socketbaseUrl = "ws://" + domainName;