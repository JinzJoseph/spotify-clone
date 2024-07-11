import { v2 as cloudinary } from "cloudinary";
import albimModel from "../models/albumModel.js";
import albumModel from "../models/albumModel.js";
export const addAlbum = async (req, res) => {
  try {
    const { name, desc, bgColor } = req.body;
    const image = req.file;
    const imageUpload = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });
    const albumData = new albimModel({
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url,
    });
    await albumData.save();

    res
      .status(200)
      .json({ message: "album added successfully", data: albumData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding album", error });
  }
};
export const listAlbum = async (req, res) => {
  try {
    const albumList = await albumModel.find();
    res.status(200).json({
      message: "successfully fetched data",
      data: albumList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting album", error });
  }
};
export const removeAlum = async (req, res) => {
  const id = req.params.id;
  try {
    await albimModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "successfully deleted album",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting album", error });
  }
};
