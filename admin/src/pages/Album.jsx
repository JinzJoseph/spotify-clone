import React, { useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const Album = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [bgColor, setBgColor] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the form submission here
    const data = {
      image,
      name,
      desc,
      bgColor,
    };
    try {
      const res = await axios.post("/api/album/addalbum", data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        toast.success(res.data.message);
      }
      setBgColor("")
      setDesc("")
      setImage('')
      setName("")
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-9 text-gray-500"
      >
        <div className="flex flex-row gap-8">
          <div className="flex flex-col gap-4">
            <p>Upload Image</p>
            <input
              type="file"
              id="image"
              name="image"
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
          <p>Album Name</p>
          <input
            type="text"
            className="bg-transparent border border-gray-600 outline-green-600  p-2.5 w-[max(40vw,250px)]"
            placeholder="Type  Name Here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <p>Album Description</p>
          <textarea
            className="bg-transparent outline-green-600 border border-gray-600 p-2.5 w-[max(40vw,250px)]"
            placeholder="Type Here"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <p>BackgroundColor</p>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default Album;
