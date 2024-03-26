import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import React, { useEffect, useRef } from "react";
import AsideBar from "../components/AsideBar";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import { ACTIONS } from "../../actions";
import toast from "react-hot-toast";

const Room = () => {
  const { roomId } = useParams();
  const socketRef = useRef(null);
  const location = useLocation();
  const reactNavigate = useNavigate();

  useEffect(() => {
    async function init() {
      socketRef.current = await initSocket();
      socketRef.current("connect_error", (err) => handleErrors(err));
      socketRef.current("connect_failed", (err) => handleErrors(err));

      function handleErrors(err) {
        console.log("Socket error", err);
        toast.error("Socket Connection failed, try again later !");
        reactNavigate("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.userName,
      });
    }
    init();
  }, []);

  if (!location.state) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="w-full flex text-white h-screen">
      <div id="aside" className="flex-[0.2] h-full">
        <AsideBar roomId={roomId || ""} />
      </div>
      <div id="editor" className="flex-[0.8] h-full bg-[#282a36]">
        <Editor />
      </div>
    </div>
  );
};

export default Room;
