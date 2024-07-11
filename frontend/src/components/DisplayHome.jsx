import React, { useContext } from "react";
import NavBar from "./NavBar";

import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { PlayerContext } from "../context/PlayerContext";
const DisplayHome = () => {
  const {songsData,albumData} =useContext(PlayerContext)
  return (
    <div>
      <NavBar />
      <div className="my-5 font-bold text-2xl mb-4  ">
        <h1 className="my-5 font-bold text-2xl ">Featured Charts</h1>
        <div className="flex overflow-auto">
        {albumData.map((item, index) => (
          <AlbumItem
            name={item.name}
            image={item.image}
            desc={item.desc}
            key={index}
            id={item._id}
          />
        ))}
        </div>
       
      </div>
      <div className="my-5 font-bold text-2xl mb-4  ">
        <h1 className="my-5 font-bold text-2xl ">Today's Biggest Hits</h1>
        <div className="flex overflow-auto">
        {songsData.map((item, index) => (
          <SongItem
            name={item.name}
            image={item.image}
            desc={item.desc}
            key={index}
            id={item._id}
          />
        ))}
        </div>
       
      </div>
    </div>
  );
};

export default DisplayHome;
