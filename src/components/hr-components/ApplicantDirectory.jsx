import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faEnvelope,
  faTrashCan,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const ApplicantDirectory = () => {
  const [keyword, setKeyword] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [status, setStatus] = useState("");
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [showFilterTags, setShowFilterTags] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  const [applicants, setApplicants] = useState([
    {
      name: "Shwetank Gopnarayan",
      date: "5 July 2024",
      jobTitle: "Data Scientist",
      score: "99%",
      status: "Interview",
    },
    {
      name: "Sagar Tayde",
      date: "10 July 2024",
      jobTitle: "Data Scientist",
      score: "85%",
      status: "Interview",
    },
    {
      name: "Sarthak Kakad",
      date: "23 July 2024",
      jobTitle: "Data Scientist",
      score: "85%",
      status: "Pending",
    },
    {
      name: "Tejas Patil",
      date: "2 August 2024",
      jobTitle: "Frontend Developer",
      score: "76%",
      status: "Rejected",
    },
    {
      name: "Niraj Kamble",
      date: "5 August 2024",
      jobTitle: "Data Scientist",
      score: "90%",
      status: "Rejected",
    },
    {
      name: "Sameer Agam",
      date: "10 July 2024",
      jobTitle: "Frontend Developer",
      score: "80%",
      status: "Interview",
    },
    {
      name: "Atharva Thakre",
      date: "23 July 2024",
      jobTitle: "Java Developer",
      score: "20%",
      status: "Rejected",
    },
  ]);

  useEffect(() => {
    setFilteredApplicants(applicants);
  }, [applicants]);

  const handleSearch = () => {
    const filtered = applicants.filter(
      (applicant) =>
        applicant.name.toLowerCase().includes(keyword.toLowerCase()) &&
        (jobTitle ? applicant.jobTitle === jobTitle : true) &&
        (status ? applicant.status === status : true)
    );
    setFilteredApplicants(filtered);
    setShowFilterTags(!!keyword || !!jobTitle || !!status);
  };

  const handleClear = () => {
    setKeyword("");
    setJobTitle("");
    setStatus("");
    setFilteredApplicants(applicants);
    setShowFilterTags(false);
  };

  const handleSortByScore = () => {
    const sortedApplicants = [...filteredApplicants].sort((a, b) => {
      const scoreA = parseInt(a.score);
      const scoreB = parseInt(b.score);
      return sortOrder === "desc" ? scoreB - scoreA : scoreA - scoreB;
    });

    setFilteredApplicants(sortedApplicants);
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  const handleDelete = (index) => {
    const updatedApplicants = [...filteredApplicants];
    updatedApplicants.splice(index, 1);
    setFilteredApplicants(updatedApplicants);
  };

  const handleViewResume = (resumeUrl) => {
    window.open(resumeUrl, "_blank");
  };

  const handleExportToCSV = () => {
    const headers = ["Name", "Apply Date", "Job Title", "ATS Score", "Status"];
    const rows = filteredApplicants.map((applicant) => [
      applicant.name,
      applicant.date,
      applicant.jobTitle,
      applicant.score,
      applicant.status,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "applicants.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <h2 className="mb-1 text-gray-500 font-bold">Keywords</h2>
      <div className="relative flex items-center w-1/2 space-x-4 mb-4">
        <div className="relative flex items-center border-2 border-gray-300 rounded-full overflow-hidden px-3 py-1 flex-grow">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-gray-400 absolute left-3"
          />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 w-full border-none focus:outline-none"
            placeholder="Enter keywords"
          />
        </div>
        <div className="relative flex items-center border-2 border-gray-300 rounded-full overflow-hidden px-3 py-1">
          <select
            className="w-full border-none focus:outline-none bg-transparent appearance-none pr-8"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          >
            <option value="">Job Title</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Java Developer">Java Developer</option>
          </select>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="absolute right-3 text-gray-400"
          />
        </div>
        <div className="relative flex items-center border-2 border-gray-300 rounded-full overflow-hidden px-3 py-1">
          <select
            className="w-full border-none focus:outline-none bg-transparent appearance-none pr-8"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Status</option>
            <option value="Interview">Interview</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="absolute right-3 text-gray-400"
          />
        </div>
        <button
          onClick={handleSearch}
          className="p-2 bg-yellow-400 text-black rounded-full flex items-center justify-center h-9 w-9"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xs" />
        </button>
      </div>

      {showFilterTags && (
        <div className="flex space-x-2 mb-4">
          {keyword && (
            <span className="bg-yellow-100 px-3 py-1 rounded-full text-sm">
              {keyword} ×
            </span>
          )}
          {jobTitle && (
            <span className="bg-yellow-100 px-3 py-1 rounded-full text-sm">
              {jobTitle} ×
            </span>
          )}
          {status && (
            <span className="bg-yellow-100 px-3 py-1 rounded-full text-sm">
              {status} ×
            </span>
          )}
          <button onClick={handleClear} className="text-blue-500">
            CLEAR
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <div className="flex">
          <h2 className="text-xl font-semibold">Applicant Directory</h2>
          <button
            onClick={handleSortByScore}
            className="border px-3 py-1 rounded ml-4"
          >
            Sort By ATS Score
          </button>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleExportToCSV}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Export to CSV
          </button>
        </div>
      </div>

      <table className="w-full">
        <thead className="bg-blue-50">
          <tr>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Resume</th>
            <th className="text-left p-3">Apply Date</th>
            <th className="text-left p-3">Job Title</th>
            <th className="text-left p-3">ATS Score</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplicants.map((applicant, index) => (
            <tr key={index} className="border-b-2 shadow-md hover:bg-gray-50">
              <td className="p-3">{applicant.name}</td>
              <td className="p-3">
                <button
                  className="bg-blue-100 text-blue-500 border-blue-500 border-2 px-4 py-1 rounded-full text-sm hover:bg-blue-50 hover:border-blue-400 transition duration-300 ease-out"
                  onClick={() => handleViewResume(applicant.resumeUrl)}
                >
                  View
                </button>
              </td>
              <td className="p-3">{applicant.date}</td>
              <td className="p-3">{applicant.jobTitle}</td>
              <td className="p-3">{applicant.score}</td>
              <td className="p-3">{applicant.status}</td>
              <td className="p-3 flex space-x-2">
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button className="text-blue-500">
                  <FontAwesomeIcon icon={faEnvelope} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantDirectory;
