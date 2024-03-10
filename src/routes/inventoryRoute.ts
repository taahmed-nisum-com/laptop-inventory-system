import { Application, NextFunction, Request, Response } from "express";
import { authorizedUser } from "../middlewares/passport-middleware";
import { addLaptop, deleteLaptop, getAllLaptops, updateLaptop } from "../controllers/inventoryController";

const inventoryRoutes = (app: Application) => {
  app
    .route("/api/laptops")
    // get all laptops
    .get(
      getAllLaptops,
      (req: Request, res: Response, next: NextFunction) => {
        next();
      }
    );

  // add laptop

  app.route("/api/laptops").post(
    authorizedUser.authenticate("jwt", { session: false }),
    addLaptop,
    (req, res, next) => {
      next();
    },
    addLaptop
  );

  app
    .route("/api/laptops/:id")
    .put(
      authorizedUser.authenticate("jwt", { session: false }),
      updateLaptop,
      (req, res, next) => {
        next();
      }
    )
    .delete(
      authorizedUser.authenticate("jwt", { session: false }),
      deleteLaptop,
      (req, res, next) => {
        next();
      }
    );
};

export default inventoryRoutes;