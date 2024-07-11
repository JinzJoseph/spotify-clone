import express from "express";
import cors from "cors";
import "dotenv/config";
import songRoute from "./src/routes/songRoute.js"
import connectDB from "./src/config/connectDb.js";
import connectclodianry from "./src/config/cloudinary.js";
import albumRoute from '../backend/src/routes/albumRoute.js'
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
connectDB()
connectclodianry()
app.get("/", (req, res) => {
  res.send("hallo api working perfectly");
});
app.use("/api/song",songRoute)
app.use("/api/album",albumRoute)
app.listen(port, () => {
  console.log("server is running on 3000");
});
