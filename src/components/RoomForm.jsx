import React, { useState } from "react";

const RoomForm = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <div className="flex flex-col gap-3 p-8 rounded-lg w-4/5 md:w-2/5 md:min-w-[30rem] border border-none neuromorphism-bg bg-zinc-900">
      <div className="text-green-500">
        <h2 className="text-3xl">CodeRaven</h2>
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-white">Enter a room code</p>
        <input
          type="text"
          className="bg-slate-100 px-4 py-2 rounded-md outline-none border-none placeholder:text-slate-500 border-2 focus:border-green-500"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          className="bg-slate-100 px-4 py-2 rounded-md outline-none border-none placeholder:text-slate-500"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter the room ID"
        />
        <button
          className="w-1/2 self-end bg-green-500 text-slate-900 border-none hover:bg-green-700"
          //   onClick={joinRoom}
        >
          Join
        </button>
      </div>
      <div>
        <p className="text-white text-center my-3">
          If you don't have an invite then create{" "}
          <a
            href="#"
            className="text-green-400 duration-300 hover:underline"
            // onClick={createNewRoom}
          >
            new room
          </a>
        </p>
      </div>
    </div>
  );
};

export default RoomForm;
