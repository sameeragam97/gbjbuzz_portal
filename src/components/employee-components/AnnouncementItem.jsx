import React from "react";

const AnnouncementItem = ({ title, message }) => {
  return (
    <div className="mb-2 bg-gray-0 p-3 rounded-md text-sm bg-gray-100 hover:bg-slate-200 transition duration-300 ease-in-out">
      <h4 className="font-bold">{title}</h4>
      <p>{message}</p>
    </div>
  );
};

export default AnnouncementItem;
