import express, { NextFunction, Request, Response } from "express";
import { getAllCategories, getAllPhotos } from "../Logic/AlbumLogic";

const albumRouter = express.Router();

albumRouter.get(
  "/photosList",
  async (request: Request, response: Response, next: NextFunction) => {
    console.log("in photos route");
    return response.status(200).json(await getAllPhotos());
  }
);

albumRouter.get(
  "/catList",
  async (request: Request, response: Response, next: NextFunction) => {
    console.log("in category list");
    return response.status(200).json(await getAllCategories());
  }
);

export default albumRouter;
