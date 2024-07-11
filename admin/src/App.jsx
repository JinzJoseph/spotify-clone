import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Songs from "./pages/Songs";
import Album from "./pages/Album";
import ListAlbum from "./pages/ListAlbum";
import ListSong from "./pages/ListSong";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <div className="flex items-start min-h-screen">
      <ToastContainer />
      <Sidebar/>
      <div className="  flex-1 h-screen overflow-y-scroll bg-white">
      <NavBar/>
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path="/add-song" element={<Songs />} />
            <Route path="/add-album" element={<Album />} />
            <Route path="/list-song" element={<ListSong />} />
            <Route path="/list-album" element={<ListAlbum />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
