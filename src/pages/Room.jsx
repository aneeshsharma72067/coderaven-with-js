import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
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
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function init() {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(err) {
        console.log("Socket error", err);
        toast.error("Socket Connection failed, try again later !");
        reactNavigate("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        userName: location.state?.userName,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, userName, socketId }) => {
          if (userName !== location.state?.userName) {
            toast.success(`${userName} joined the room`);
            console.log(`${userName} ${location.state?.userName}`);
          }
          setClients(clients);
        }
      );

      // listen for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, userName }) => {
        toast.success(`${userName} left the room`);
        setClients((prev) => {
          return prev.filter((client) => {
            client.socketId !== socketId;
            console.log(clients);
          });
        });
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
        <AsideBar
          roomId={roomId || ""}
          userName={location.state?.userName}
          clients={clients}
        />
      </div>
      <div id="editor" className="flex-[0.8] h-full bg-[#282a36]">
        <Editor />
      </div>
    </div>
  );
};

export default Room;
