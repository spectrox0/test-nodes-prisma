import express, { Router } from "express";
import { config } from "config";
import helmet from "helmet";
import cors from "cors";
import { AuthenticationRoutes, MenuRoutes, UsersRoutes } from "routes";
import "@/config/database";
export const bootstrap = (port = config.PORT) => {
  //Instance of express
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cors());
  //Include all routes

  const addRoute = (baseApi: string, route: Router) => {
    app.use(`/api/${baseApi}`, route);
  };
  addRoute("menus", MenuRoutes);
  addRoute("auth", AuthenticationRoutes);
  addRoute("users", UsersRoutes);
  //Middlewares to parse the request body
  //body parser, helmet and cors

  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  return { server, app };
};
