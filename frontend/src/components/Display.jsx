import React, { useContext, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";

import { PlayerContext } from "../context/PlayerContext";

const Display = () => {
  const {albumData}=useContext(PlayerContext)
  const displayref = useRef();
  const location = useLocation();
  console.log(location);
  const isAlbum = location.pathname.includes("album");
  const albumid = isAlbum ? location.pathname.split("/").pop():""
  const bgcolor = isAlbum ? albumData.find((i)=>(i._id=albumid)).bgcolor:'';
  useEffect(() => {
    if (isAlbum) {
      displayref.current.style.background = `linear-gradient(${bgcolor},#121212)`;
    } else {
      displayref.current.style.background = `#121212`;
    }
  } ,[isAlbum, bgcolor, displayref]);
  return (
    <div
      ref={displayref}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] "
    >
      <Routes>
        <Route path="/" element={<DisplayHome />}></Route>
        <Route path="/album/:id" element={<DisplayAlbum album={albumData.find((x)=>(x._id==albumid))} />}></Route>
      </Routes>
    </div>
  );
};

export default Display;
