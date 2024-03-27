import React, { useState } from "react";
import Client from "./Client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AsideBar = ({ roomId, userName, clients }) => {
  const navigate = useNavigate();

  const copyRoomId = () => {
    navigator.clipboard
      .writeText(roomId)
      .then(() => {
        toast.success("Room ID copied Successfully");
      })
      .catch(() => console.log("error in copying"));
  };

  const leaveRoom = () => {
    navigate("/");
    toast.success("Left Room Successfully");
  };
  return (
    <div className="h-full flex flex-col justify-between bg-slate-950 p-5">
      <div>
        <div className="text-green-500">
          <h2 className="text-3xl">CodeRaven</h2>
          <hr className="my-3 border-slate-600" />
        </div>
        <div className="">
          <h3 className="text-xl font-medium">Connected</h3>
          <div className="grid grid-cols-3 gap-5 my-5">
            {clients.map((client, key) => (
              <Client client={client} key={key} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1">
        <button
          className="bg-white hover:bg-slate-300 text-slate-800"
          onClick={copyRoomId}
        >
          Copy Room ID
        </button>
        <button className="bg-red-600 hover:bg-red-800" onClick={leaveRoom}>
          Leave
        </button>
      </div>
    </div>
  );
};

export default AsideBar;
