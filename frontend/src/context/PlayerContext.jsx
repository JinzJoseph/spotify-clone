import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios"

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const [songsData, SetSongData] = useState([]);
  const [albumData, SetAlbumData] = useState([]);
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const [track, setTrack] = useState(songsData[5]);
  const [playstatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });
  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };
  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };
  const seekSong = async (e) => {
    console.log(e);
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.duration;
  };
  const playwithId = async (id) => {
   await songsData.map((item)=>{
    if(id===item._id){
      setTrack(item)
    }
   })
   await audioRef.current.play();
   setPlayStatus(true)
  };
  const prev = async () => {
    songsData.map(async(item,index)=>{
      if(track._id===item._id && index >0){
        await setTrack(songsData[index-1])
        await audioRef.current.play();
        setPlayStatus(true)
      }
    })
  };
  const next = async () => {
    songsData.map(async(item,index)=>{
      if(track._id===item._id && index <songsData.length){
        await setTrack(songsData[index+1])
        await audioRef.current.play();
        setPlayStatus(true)
      }
    })
  };
  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    });
  }, [audioRef]);

  const fetchsongData = async () => {
   try {
    const res = await axios.get("/api/song/list");
    if (res.status === 200) {
      SetSongData(res.data.data);
     setTrack (res.data.data[0])
    }
   } catch (error) {
    console.log(error);
   }
  };
  const fetchAlbumData = async () => {
   try {
    const res = await axios.get("/api/album/getalbum");
    if (res.data.data) {
      SetAlbumData(res.data.data);
    }
   } catch (error) {
    console.log(error);
   }
  };
useEffect(()=>{
  fetchsongData(),
  fetchAlbumData()
},[])
  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playstatus,
    setPlayStatus,
    time,
    setTime,
    play,
    playwithId,
    pause,
    prev,
    next,
    seekSong,
    songsData,
    albumData
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};
export default PlayerContextProvider;
