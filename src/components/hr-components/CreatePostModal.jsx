import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const CreatePostModal = ({ isOpen, onClose, onCreatePost }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [image, setImage] = useState(null);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(), // Generate a unique ID
      title: jobTitle,
      description: jobDescription,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      expiryDate: expiryDate,
      image: image
    };
    onCreatePost(newPost);
    // Reset form fields
    setJobTitle("");
    setJobDescription("");
    setExpiryDate("");
    setImage(null);
    // Close the modal after submission
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-1/2">
        <h2 className="text-2xl font-bold mb-4">Editor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Job Title</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Job Description</label>
            <textarea
              className="w-full border rounded p-2"
              rows="4"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Post Expiry Date</label>
            <input
              type="date"
              className="w-full border rounded p-2"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Upload Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {image ? (
                <img
                  src={image}
                  alt="Uploaded preview"
                  className="w-24 m-auto"
                />
              ) : (
                <label className="cursor-pointer">
                  <FontAwesomeIcon
                    icon={faUpload}
                    className="text-gray-500 text-2xl mb-2"
                  />
                  <p className="text-gray-500">Click to upload image</p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              type="button"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Discard
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
