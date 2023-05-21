import React from "react";
import Image from "next/image";
const defaultImage = "../assets/default.png";
export default function Card(props) {
  const { imageUrl, title, note } = props;
  return (
    <div className="max-w-sm rounded-md overflow-hidden shadow-lg text-left">
      <img
        className="w-full h-56 lg:h-60 xl:h-72"
        src={imageUrl || defaultImage}
        alt={title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
        {note}
        </p>
      </div>
    </div>
  );
}
