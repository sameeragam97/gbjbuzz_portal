import React from "react";

const RightSidebar = () => {
  const sidebarWidth = "w-96"; // Adjust width as needed

  return (
    <div
      className={`bg-white text-black flex flex-col h-screen sticky top-0 right-0 transition-all duration-300 ease-out ${sidebarWidth}`}
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      {/* Centered Heading Section at the Top */}
      <div className="flex items-center justify-center border-b border-gray-200 p-4">
        <h2 className="text-xl font-bold">Reviews</h2>
      </div>

      {/* Content of the Right Sidebar */}
      <div className="flex-1 p-4 space-y-6">
        {/* Block 1 */}
        <div className="bg-gray-100 p-6 rounded-2xl shadow-lg h-36 flex items-start relative">
          <div className="flex items-center">
            {/* Grey Circle */}
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              {/* Optionally, add an image here if needed */}
            </div>
            <div className="ml-4 flex flex-col justify-center">
              {/* Text Content */}
              <h3 className="text-md font-semibold">Sakshi Tikle</h3>
              <p className="text-sm text-gray-700">Task: Make the UI of the portal website</p>
              <p className="text-sm text-gray-700 mt-1">"Excellent Work"</p>
            </div>
          </div>
        </div>

        {/* Block 2 */}
        <div className="bg-gray-100 p-6 rounded-2xl shadow-lg h-36 flex items-start relative">
          <div className="flex items-center">
            {/* Grey Circle */}
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              {/* Optionally, add an image here if needed */}
            </div>
            <div className="ml-4 flex flex-col justify-center">
              {/* Text Content */}
              <h3 className="text-md font-semibold">Sakshi Tikle</h3>
              <p className="text-sm text-gray-700">Task: Make the UI of the portal website</p>
              <p className="text-sm text-gray-700 mt-1">"Excellent Work"</p>
            </div>
          </div>
        </div>

        {/* Block 3 */}
        <div className="bg-gray-100 p-6 rounded-2xl shadow-lg h-36 flex items-start relative">
          <div className="flex items-center">
            {/* Grey Circle */}
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              {/* Optionally, add an image here if needed */}
            </div>
            <div className="ml-4 flex flex-col justify-center">
              {/* Text Content */}
              <h3 className="text-md font-semibold">Sakshi Tikle</h3>
              <p className="text-sm text-gray-700">Task: Make the UI of the portal website</p>
              <div>  <p className="text-sm text-gray-700 mt-1">"Excellent Work"</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
