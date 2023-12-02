import express, { NextFunction, Request, Response } from "express";
import { addCat, addPhoto, deleteCatById, deletePhotoById, getAllCategories, getAllPhotos, updateCat } from "../Logic/AlbumLogic";

const albumRouter = express.Router();


//photos router
albumRouter.get(
  "/photosList",
  async (request: Request, response: Response, next: NextFunction) => {
    console.log("in photos route");
    return response.status(200).json(await getAllPhotos());
  }
);

albumRouter.post(
  "/addPhoto",
  async (request: Request, response: Response, next: NextFunction) => {
    const newPhoto = request.body;
    const result = await addPhoto(newPhoto);
    return response.status(201).json(`${result}`);
  }
);

albumRouter.delete(
  "/deletePhotoById/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const photoID = +request.params.id;
    await deletePhotoById(photoID);
    return response.status(200).json({});
  }
);



//category router
albumRouter.get(
  "/catList",
  async (request: Request, response: Response, next: NextFunction) => {
    console.log("in category list");
    return response.status(200).json(await getAllCategories());
  }
);

albumRouter.post(
  "/addCat",
  async (request: Request, response: Response, next: NextFunction) => {
    const newCategory = request.body;
    const result = await addCat(newCategory);
    return response.status(201).json(`${result}`);
  }
);

albumRouter.put(
  "/updateCat/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const categoryId = +request.params.id;
    const updatedCategory = request.body;
    const result = await updateCat({ ...updatedCategory, category_id: categoryId });

    if (result) {
      return response.status(200).json({ success: true });
    } else {
      return response.status(500).json({ success: false, error: "Failed to update category" });
    }
  }
);


albumRouter.delete(
  "/deleteCatById/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const categoryId = +request.params.id;
    await deleteCatById(categoryId);
    return response.status(200).json({});
  }
);

export default albumRouter;
