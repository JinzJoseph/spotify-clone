import {
  addAlbum,
  listAlbum,
  removeAlum,
} from "../Contollers/albumController.js";
import { upload } from "../middlewares/multer.js";
import express, { Router } from "express";
const route = express.Router();
route.post("/addalbum", upload.single("image"), addAlbum);
route.get("/getalbum", listAlbum);
route.delete("/deleteAlbum/:id", removeAlum);
export default route;
