import express, { NextFunction, Request, Response } from "express";
import {
  addSong,
  deleteSongById,
  getAllSongs,
  getSongById,
  updateSong,
  catList,
  getCatById,
  deleteCatById,
  addCat,
  updateCat,
  updateFavoriteStatus,
  getFavoriteSongs,
} from "../Logic/YoutubeLogic";

const youtubeRouter = express.Router();

youtubeRouter.get(
  "/songList",
  async (request: Request, response: Response, next: NextFunction) => {
    console.log("in song route");
    return response.status(200).json(await getAllSongs());
  }
);

youtubeRouter.get(
  "/songById/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const songID = +request.params.id;
    return response.status(200).json(await getSongById(songID));
  }
);

youtubeRouter.delete(
  "/deleteSongById/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const songID = +request.params.id;
    await deleteSongById(songID);
    return response.status(200).json({});
  }
);

youtubeRouter.post(
  "/addSong",
  async (request: Request, response: Response, next: NextFunction) => {
    const newSong = request.body;
    const result = await addSong(newSong);
    return response.status(201).json(`${result}`);
  }
);

youtubeRouter.put(
  "/updateSong",
  async (request: Request, response: Response, next: NextFunction) => {
    const song = request.body;
    return response.status(201).json(await updateSong(song));
  }
);

youtubeRouter.get(
  "/catList",
  async (request: Request, response: Response, next: NextFunction) => {
    console.log("in category list");
    return response.status(200).json(await catList());
  }
);

youtubeRouter.get(
  "/catById/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const categoryId = +request.params.id;
    return response.status(200).json(await getCatById(categoryId));
  }
);

youtubeRouter.delete(
  "/deleteCatById/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const categoryId = +request.params.id;
    await deleteCatById(categoryId);
    return response.status(200).json({});
  }
);

youtubeRouter.post(
  "/addCat",
  async (request: Request, response: Response, next: NextFunction) => {
    const newCategory = request.body;
    const result = await addCat(newCategory);
    return response.status(201).json(`${result}`);
  }
);

youtubeRouter.put(
  "/updateCat",
  async (request: Request, response: Response, next: NextFunction) => {
    const categoryId = request.params.categoryId;
    const updatedCategory = request.body;

    // Call the updateCat function with categoryId and updatedCategory

    return response.status(201).json(updatedCategory);
  }
);

youtubeRouter.put(
  "/updateFavoriteStatus/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const songId = +request.params.id;
    const { favorite } = request.body;

    try {
      // Update the favorite status in the database
      await updateFavoriteStatus(songId, favorite);

      // Respond with a success message
      return response
        .status(200)
        .json({ message: "Favorite status updated successfully." });
    } catch (error) {
      console.error(
        `Error updating favorite status for song with id ${songId}:`,
        error
      );
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
);
youtubeRouter.get(
  "/favoriteSongs",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const favoriteSongs = await getFavoriteSongs();
      return response.status(200).json(favoriteSongs);
    } catch (error) {
      console.error("Error fetching favorite songs:", error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default youtubeRouter;
