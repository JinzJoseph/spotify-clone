import {addsong,listSong, removeSong} from "../Contollers/songContoller.js"
import {upload} from "../middlewares/multer.js"
import express from "express"
const route=express.Router();
route.post("/add",upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),addsong);
route.get("/list",listSong);
route.delete("/remove/:id",removeSong)
export default route;