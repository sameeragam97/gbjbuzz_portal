import React, { useState, useEffect } from "react";

const JobDetailsModal = ({ isOpen, onClose, job, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(job?.description || "");

  useEffect(() => {
    setEditedDescription(job?.description || "");
    setIsEditing(false);
  }, [job]);

  if (!isOpen) return null;

  const handleSave = () => {
    onEdit(job.id, editedDescription);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-1/2">
        <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
        <p className="text-gray-600 mb-2">Posted on: {job.date}</p>
        
        {isEditing ? (
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full h-40 p-2 border rounded mb-4"
          />
        ) : (
          <p className="mb-4">{job.description || "No description available."}</p>
        )}

        <div className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
          )}
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;