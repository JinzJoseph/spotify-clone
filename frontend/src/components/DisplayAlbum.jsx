import React, { useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = ({ album }) => {
  const [albumsData, SetAlbumsData] = useState("");
  const { playwithId, songsData, albumData } = useContext(PlayerContext);
  const { id } = useParams();
  console.log(id);
  const albumdata = albumsData[id];
  console.log(albumdata);
  useEffect(() => {
    albumData.map((item) => {
      if (item._id === id) {
        SetAlbumsData(item);
      }
    });
  }, []);
  return albumsData ? (
    <>
      <NavBar />
      <div className="mt-10 flex gap-4 flex-col md:flex-row md:items-end">
        <img src={albumsData.image} alt="" className="w-48 rounded" />
        <div className="flex flex-col">
          <p>PlayList</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumsData.name}
          </h2>
          <h4 className="">{albumsData.desc}</h4>
          <p className="mt-1">
            <img src={assets.spotify_logo} alt="" />
            <b>Spotify</b>
            *1,334,566 likes *<b>50 songs,</b>
            about 2 hr 30 min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p className="hidden sm:block">Album Name</p>
        <p className="hidden sm:block">Date Added</p>
        <img src={assets.clock_icon} alt="" className="m-auto w-5" />
      </div>
      <hr />
      {songsData
        .filter((item) => {
          item.album === album.name;
        })
        .map((item, index) => {
          return (
            <div
              onClick={() => playwithId(item._id)}
              key={index}
              className="grid grid-cols-3 sm:grid-cols-4 gap-3    items-center text-[#a7a7a7] hover:bg-[#fffff] cursor-pointer"
            >
              <p className="text-white">
                <b className="mr-4 text-[#a7a7a7] ">{index + 1}</b>
                <img
                  src={item.image}
                  alt=""
                  className="inline w-10 mr-5 gap-3 mt-2"
                />
                {item.name}
              </p>
              <p className="text-[15px]">{albumsData.name}</p>
              <p className="text-[15px] hidden sm:block">5 days ago</p>
              <p className="text-[15px] text-center">{item.duration}</p>
            </div>
          );
        })}
    </>
  ) : null;
};

export default DisplayAlbum;
