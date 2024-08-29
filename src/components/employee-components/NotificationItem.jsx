
import React from "react";

const NotificationItem = ({ message }) => {
  return <li className="mb-2 bg-yellow-400 text-center p-3 rounded-md text-sm  hover:bg-yellow-500 transition duration-300 ease-in-out">{message}</li>;
};

export default NotificationItem;
