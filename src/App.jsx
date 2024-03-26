import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Home from "./pages/Home";
import Room from "./pages/Room";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              iconTheme: {
                primary: "#0fb609",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ff0000",
                secondary: "#ffffff",
              },
            },
          }}
        ></Toaster>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor/:roomId" element={<Room />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
