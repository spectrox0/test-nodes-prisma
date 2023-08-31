import express from "express";
import { config } from "config";
import helmet from "helmet";
import cors from "cors";
import * as Routes from "routes";

// Instance client of database when the server starts
import "./config/database";
//Instance of express
const app = express();
//Include all routes
const routes = Object.values(Routes);

//Base api name
const baseApiName = "/api";
app.use(baseApiName, routes);

//Middlewares to parse the request body
//body parser, helmet and cors
[express.json, helmet, cors].forEach(middleware => app.use(middleware()));

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
