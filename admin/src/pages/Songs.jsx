import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
const Songs = () => {
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("");
  const [albumdata, setAlbumData] = useState([]);
  const handleFileChange = (e) => {
    const { id, files } = e.target;
    if (id === "audio") {
      setAudio(files[0]);
    } else if (id === "image") {
      setImage(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audio || !image || !name || !desc || !album) {
      alert("Please fill in all fields");
      return;
    }

    const data = {
      audio,
      image,
      name,
      desc,
      album,
    };
    console.log(data);

    try {
      const response = await axios.post("/api/song/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("There was an error uploading the song:", error);
      toast.error("something went wrong");
    }
  };
  const loadAlbum = async () => {
    const res = await axios.get("/api/album/getalbum");
    if (res.status === 200) {
      setAlbumData(res.data.data);
    }
  };
  useEffect(() => {
    loadAlbum();
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start gap-9 text-gray-500"
    >
      <div className="flex flex-row gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input
            type="file"
            id="audio"
            accept="audio/*"
            hidden
            onChange={handleFileChange}
          />
          <label htmlFor="audio">
            <img
              src={audio ? assets.upload_added : assets.upload_song}
              className="w-24 cursor-pointer"
              alt="Upload Song"
            />
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className="w-24 cursor-pointer"
              alt="Upload Image"
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Song</p>
        <input
          type="text"
          className="bg-transparent border border-gray-600 outline-green-600  p-2.5 w-[max(40vw,250px)]"
          placeholder="Type Here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Song Description</p>
        <textarea
          className="bg-transparent outline-green-600 border border-gray-600 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type Here"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-3">
        <p>Album</p>
        <select
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          required
        >
          {albumdata.map((item, index) => {
            return (
              <option value={item.name} key={index}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <button
        type="submit"
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
      >
        Add
      </button>
    </form>
  );
};

export default Songs;
