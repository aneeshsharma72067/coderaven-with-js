import React from "react";

const getAlias = (name) => {
  const nameList = name.split(" ");
  let alias = "";
  nameList.forEach((word) => {
    alias += word[0].toUpperCase();
  });
  return alias;
};

const getRandomColor = () => {
  const colors = ["red", "green", "brown", "blue", "purple", "indigo"];
  return colors[Math.floor(Math.random() * 5)];
};

const Client = ({ client }) => {
  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      <div
        className="aspect-square w-4/5 flex items-center justify-center text-xl h-auto rounded-md text-white"
        style={{ background: getRandomColor() }}
      >
        {getAlias(client.userName)}
      </div>
      <span className="text-center">{client.userName.split(" ")[0]}</span>
    </div>
  );
};

export default Client;
