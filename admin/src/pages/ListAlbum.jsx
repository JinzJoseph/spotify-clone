import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const ListAlbum = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/album/getalbum");
      if (response.status === 200) {
        console.log(response.data.data);
        setData(response.data.data);
      }
    } catch (error) {
      console.error("There was an error uploading the song:", error);
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleRemove = async (id) => {
    try {
      const res = await axios.delete(`/api/album/deleteAlbum/${id}`);
      if (res.status === 200) {
        toast.success("item remvoed successfully ");
        fetchData();
      }
    } catch (error) {
      console.log("something went wrong");
    }
  };
  return (
    <div>
      <p>All Album List</p>
      <br />
      <div>
        <div className="grid grid-cols-3 sm:grid-cols-5 bg-slate-600 py-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
          <b>Image</b>
          <b>Name</b>
          <b>Desc</b>
          <b>bgColor</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-3    items-center text-[#a7a7a7] hover:bg-[#fffff] cursor-pointer"
            >
              <img src={item.image} alt="" className="w-12" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <p>
                <input type="color" value={item.bgColor} name="" id="" />
              </p>

              <p onClick={() => handleRemove(item._id)}>x</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListAlbum;
