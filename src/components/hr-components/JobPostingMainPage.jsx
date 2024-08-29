import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTrashCan,
  faArrowsRotate,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import LinkedinIcon from "../../assets/icons/LinkedinIcon";
import InstagramIcon from "../../assets/icons/InstagramIcon";
import FacebookIcon from "../../assets/icons/FacebookIcon";
import IndeedIcon from "../../assets/icons/IndeedIcon";
import CreatePostModal from "./CreatePostModal";

const JobDetailsModal = ({ isOpen, onClose, job, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(
    job?.description || ""
  );

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
          <p className="mb-4">
            {job.description || "No description available."}
          </p>
        )}

        <div className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const JobPostingMainPage = () => {
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showFilterTags, setShowFilterTags] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJobDetailsModalOpen, setIsJobDetailsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Sample job titles for suggestions
  const keywordSuggestions = [
    "Graphic Designer",
    "Data Science Interns",
    "UI/UX",
    "HR Manager",
    "Data Analyst",
  ];

  const [postHistory, setPostHistory] = useState([
    {
      id: 1,
      title: "Graphic Designer",
      date: "5 July 2024",
      description:
        "We are looking for a creative Graphic Designer to join our team.",
    },
    {
      id: 2,
      title: "Data Science Interns",
      date: "10 July 2024",
      description:
        "Exciting opportunity for Data Science students to gain real-world experience.",
    },
    {
      id: 3,
      title: "UI/UX",
      date: "23 July 2024",
      description:
        "Join our UX team to create intuitive and beautiful user interfaces.",
    },
    {
      id: 4,
      title: "HR Manager",
      date: "2 August 2024",
      description:
        "Experienced HR Manager needed to lead our growing HR department.",
    },
    {
      id: 5,
      title: "Data Analyst",
      date: "5 August 2024",
      description:
        "We're seeking a Data Analyst to help drive data-informed decisions.",
    },
    {
      id: 6,
      title: "Data Science Interns",
      date: "10 July 2024",
      description: "Another great opportunity for Data Science interns.",
    },
    {
      id: 7,
      title: "UI/UX",
      date: "23 July 2024",
      description: "Second opening for a talented UI/UX designer.",
    },
  ]);

  useEffect(() => {
    setFilteredPosts(postHistory);
  }, [postHistory]);

  useEffect(() => {
    if (keyword) {
      const filteredSuggestions = keywordSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(keyword.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [keyword]);

  const handleClear = () => {
    setKeyword("");
    setStartDate("");
    setEndDate("");
    setFilteredPosts(postHistory);
    setShowFilterTags(false);
  };

  const handleSearch = () => {
    const keywordLower = keyword.toLowerCase();
    const filtered = postHistory.filter((post) => {
      const postDate = new Date(post.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      const isWithinDateRange =
        !start || !end || (postDate >= start && postDate <= end);

      return (
        post.title.toLowerCase().includes(keywordLower) && isWithinDateRange
      );
    });
    setFilteredPosts(filtered);
    setShowFilterTags(true);
  };

  const handleDateChange = (e, setDate) => {
    setDate(e.target.value);
    setShowFilterTags(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getFilterTags = () => {
    const tags = [];
    if (keyword) {
      tags.push(
        <span
          key="keyword"
          className="bg-yellow-100 px-3 py-1 rounded-full text-sm flex items-center"
        >
          {keyword}
          <span
            onClick={() => setKeyword("")}
            className="ml-2 cursor-pointer text-gray-400"
          >
            x
          </span>
        </span>
      );
    }
    if (startDate && endDate) {
      tags.push(
        <span
          key="date-range"
          className="bg-yellow-100 px-3 py-1 rounded-full text-sm flex items-center"
        >
          {startDate} - {endDate}
          <span
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
            className="ml-2 cursor-pointer text-gray-400"
          >
            x
          </span>
        </span>
      );
    }
    return tags;
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setIsJobDetailsModalOpen(true);
  };

  const handleEditJob = (jobId, newDescription) => {
    const updatedPosts = postHistory.map((post) =>
      post.id === jobId ? { ...post, description: newDescription } : post
    );
    setPostHistory(updatedPosts);
    setFilteredPosts(updatedPosts);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      const updatedPosts = postHistory.filter((post) => post.id !== jobId);
      setPostHistory(updatedPosts);
      setFilteredPosts(updatedPosts);
    }
  };
  const handleCreatePost = (newPost) => {
    const updatedPosts = [newPost, ...postHistory];
    setPostHistory(updatedPosts);
    setFilteredPosts(updatedPosts);
  };

  return (
    <div className="p-12 bg-white w-full">
      {/* Header */}
      <div className="flex justify-between items-center m-auto mb-6">
        <h1 className="text-4xl font-bold">
          <span className="text-yellow-400">Job</span> Posting
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-500 transition duration-300 ease-out"
          >
            Create Post +
          </button>
          <div className="flex space-x-2">
            <span>
              <LinkedinIcon />
            </span>
            <span>
              <InstagramIcon />
            </span>
            <span>
              <FacebookIcon />
            </span>
            <span>
              <IndeedIcon />
            </span>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative flex items-center w-7/12 space-x-4 mb-4">
        {/* Keyword Input */}
        <div className="flex-1">
          <h2 className="mb-1 font-semibold">Keywords</h2>
          <div className="relative flex items-center border-2 border-gray-300 rounded-full overflow-hidden px-3 py-1">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-gray-400 absolute left-3"
            />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 w-full border-none focus:outline-none"
              placeholder="Enter keywords"
            />
            <span
              onClick={() => setKeyword("")}
              className="text-gray-400 cursor-pointer ml-2"
            >
              X
            </span>
            {/* Autocomplete Suggestions */}
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg z-10">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Date Range Input */}
        <div className="flex-1">
          <h2 className="mb-1 font-semibold">Date Range</h2>
          <div className="relative flex items-center border-2 border-gray-300 rounded-full overflow-hidden px-3 py-1">
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleDateChange(e, setStartDate)}
              className="w-full border-none focus:outline-none"
            />
            <span className="mx-2 text-gray-600">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleDateChange(e, setEndDate)}
              className="w-full border-none focus:outline-none"
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="p-2 bg-yellow-400 text-black rounded-full flex items-center justify-center h-9 w-9 mt-7"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xs" />
        </button>
      </div>

      {/* Filter Tags */}
      {showFilterTags && (
        <div className="flex flex-wrap gap-2 mb-6">
          {getFilterTags()}
          <button
            onClick={handleClear}
            className="text-yellow-500 font-semibold"
          >
            CLEAR
          </button>
        </div>
      )}

      {/* Post History */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Post History</h2>
        <table className="w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-3 text-left">Job Title</th>
              <th className="p-3 text-left">Job Description</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b-2 shadow-md hover:bg-gray-50"
                >
                  <td className="p-3">{post.title}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleViewJob(post)}
                      className="bg-blue-100 text-blue-500 border-blue-500 border-2 px-4 py-1 rounded-full text-sm hover:bg-blue-50 hover:border-blue-400 transition duration-300 ease-out"
                    >
                      View
                    </button>
                  </td>
                  <td className="p-3">{post.date}</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => handleViewJob(post)}
                      className="text-blue-500 bg-blue-100 p-2 rounded-full"
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="text-green-500"
                      />
                    </button>
                    <button className="text-green-500 bg-green-100 p-2 rounded-full">
                      <FontAwesomeIcon
                        icon={faArrowsRotate}
                        className="text-blue-500"
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteJob(post.id)}
                      className="text-red-500 bg-red-100 p-2 rounded-full"
                    >
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="text-red-500"
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No posts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreatePost={handleCreatePost}
      />

      <JobDetailsModal
        isOpen={isJobDetailsModalOpen}
        onClose={() => setIsJobDetailsModalOpen(false)}
        job={selectedJob}
        onEdit={handleEditJob}
      />
    </div>
  );
};

export default JobPostingMainPage;
