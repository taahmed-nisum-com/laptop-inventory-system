import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoute";
import passport from "passport";
import session from "express-session";
import morgan from "morgan";
import dotenv from "dotenv";
import logger from "./loggers/logger";
import errorMiddleware from "./middlewares/error";
import connectDB from "./db";
import inventoryRoutes from "./routes/inventoryRoute";

dotenv.config();

const Server = () => {
const app: Express = express();
const port = 8088;

 connectDB()
 const checkConnection = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB is connected');
  } else {
    console.log('MongoDB is not connected');
  }
};

checkConnection()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());

userRoutes(app);
inventoryRoutes(app);

app.use((err: Error, req: Request, res: Response, next) => {
  errorMiddleware(err, req, res, next);
});
app.use(morgan("combined", { stream: logger.stream }));
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}. Happy Coding`);
});

};

export default Server;