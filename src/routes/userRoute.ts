import { Application, NextFunction, Request, Response } from "express";
import { addUser, getUsers, loginUser } from "../controllers/userController";
import passport from "passport";
import {authorizedUser} from "../middlewares/passport-middleware";


const userRoutes = (app: Application) => {
  app
    .route("/api/users")
    .get(
      authorizedUser.authenticate("jwt", { session: false }),
      getUsers,
      (req: Request, res: Response, next: NextFunction) => {
        next();
      }
    );

  app.route("/api/auth/login").post((req, res, next) => {

    next();
  }, loginUser);

  app.route("/api/auth/signup").post((req, res, next) => {
    next();
  }, addUser);
};

export default userRoutes;