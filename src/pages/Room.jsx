import { useParams } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import AsideBar from "../components/AsideBar";
import Editor from "../components/Editor";

const Room = () => {
  const { roomId } = useParams();
  const socketRef = useRef(null);
  useEffect(() => {}, []);

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
