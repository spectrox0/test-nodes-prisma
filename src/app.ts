import express from "express";
import { config } from "config";
import helmet from "helmet";
import cors from "cors";
import * as Routes from "routes";
const app = express();
//Include all routes
const routes = Object.values(Routes);
const baseApiName = "/api";
app.use(baseApiName, routes);

//Middlewares to parse the request body
[express.json, helmet, cors].forEach((middleware) => app.use(middleware()));

app.listen(config.PORT);
