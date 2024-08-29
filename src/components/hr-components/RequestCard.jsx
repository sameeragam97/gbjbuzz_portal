  import React from "react";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faCodePullRequest } from "@fortawesome/free-solid-svg-icons";

  const RequestCard = ({ bgColor, textColor, title, count, iconSize }) => {
    return (
      <div className={`bg-${bgColor} rounded-lg p-4 flex`}>
        <FontAwesomeIcon
          icon={faCodePullRequest}
          size={iconSize}
          className="mr-2"
        />
        <div>
          <p className={`text-xs text-${textColor}`}>{title}</p>
          <p className="text-lg font-bold">{count}</p>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        </div>
      </div>
    );
  };

  export default RequestCard;
