import { Router } from "express";
import { PlaylistController } from "./playlist.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createPlaylistSchema, playlistIdParamSchema, updatePlaylistSchema } from "./playlist.schema";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authPage } from "../../middlewares/authPage.middleware";

const playlistRoutes = Router();
playlistRoutes.use(authPage);
const playlistController = new PlaylistController();

// playlistRoutes.use(authMiddleware);

playlistRoutes.post("/", validate(createPlaylistSchema), playlistController.create);
playlistRoutes.get("/", playlistController.findMyPlaylists);
playlistRoutes.get("/:id", validate(playlistIdParamSchema), playlistController.getById);
playlistRoutes.put("/:id", validate(updatePlaylistSchema), playlistController.update);
playlistRoutes.delete("/:id", validate(playlistIdParamSchema), playlistController.delete);

export { playlistRoutes };