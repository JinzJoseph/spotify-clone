import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

export const addsong = async (req, res) => {
  try {
    
    const { name, desc, album } = req.body;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];
  
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;
    console.log(name, desc, album, audioUpload, imageUpload);
    const newSong = new songModel({
      name,
      desc,
      album,
      file: audioUpload.secure_url,
      image: imageUpload.secure_url,
      duration: duration,
    });

    await newSong.save();

    res.status(201).json({ message: "Song added successfully", song: newSong });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding song", error });
  }
};

export const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find();
    res.status(200).json({
      message: "suucessfully fetched  data",
      data: allSongs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding song", error });
  }
};

export const removeSong = async (req, res) => {
  const id = req.params.id; // Extract the song ID from the request parameters
  try {
    const deletedSong = await songModel.findByIdAndDelete(id); // Pass the ID directly to the method
    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json({
      message: "Successfully deleted song",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing song", error });
  }
};