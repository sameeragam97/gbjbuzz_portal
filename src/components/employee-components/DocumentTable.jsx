import React, { useState } from "react";
import {
  FaSearch,
  FaUpload,
  FaFilePdf,
  FaFileWord,
  FaFilePowerpoint,
  FaFileExcel,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DocumentDirectory = () => {
  const [filters, setFilters] = useState({
    keywords: "",
    type: "All",
    dateRange: [null, null],
    department: "All",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState("Contract");
  const [documents, setDocuments] = useState([
    {
      name: "Free Textbook as the New.pdf",
      type: "Announcement",
      department: "Engineering",
      lastModified: "5/6/24",
      author: "Sakshi Tikle",
      comments: 3,
      views: 341,
      icon: <FaFilePdf className="text-red-500" />,
      url: "https://example.com/free-textbook.pdf",
    },
    {
      name: "Employee Handbook.doc",
      type: "Form",
      department: "Company",
      lastModified: "10/6/24",
      author: "Prashant",
      comments: 1,
      views: "34k",
      icon: <FaFileWord className="text-blue-500" />,
      url: "https://example.com/employee-handbook.doc",
    },
    {
      name: "Digital Media 2024.ppt",
      type: "Template",
      department: "Company",
      lastModified: "15/6/24",
      author: "Sarthak",
      comments: 4,
      views: "41k",
      icon: <FaFilePowerpoint className="text-orange-500" />,
      url: "https://example.com/digital-media-2024.ppt",
    },
    {
      name: "Digital Media 2024.xls",
      type: "Template",
      department: "Marketing",
      lastModified: "15/6/24",
      author: "Sarthak",
      comments: 3,
      views: 100,
      icon: <FaFileExcel className="text-green-500" />,
      url: "https://example.com/digital-media-2024.xls",
    },
  ]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setFilters({ ...filters, dateRange: [start, end] });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setDocumentType("Contract");
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const newDocument = {
        name: selectedFile.name,
        type: documentType,
        department: "User Uploaded",
        lastModified: new Date().toLocaleDateString(),
        author: "User",
        comments: 0,
        views: 0,
        icon: getIconByFileType(selectedFile.name),
        url: URL.createObjectURL(selectedFile),
      };

      setDocuments([newDocument, ...documents]);
      setIsModalOpen(false);
      setSelectedFile(null);
      setDocumentType("Contract");
    }
  };

  const getIconByFileType = (fileName) => {
    const fileExtension = fileName.split(".").pop();
    switch (fileExtension) {
      case "pdf":
        return <FaFilePdf className="text-red-500" />;
      case "doc":
      case "docx":
        return <FaFileWord className="text-blue-500" />;
      case "ppt":
      case "pptx":
        return <FaFilePowerpoint className="text-orange-500" />;
      case "xls":
      case "xlsx":
        return <FaFileExcel className="text-green-500" />;
      default:
        return <FaFileWord className="text-gray-500" />;
    }
  };

  const filteredDocuments = documents.filter((doc) => {
    const isDepartmentMatch =
      filters.department === "All" || doc.department === filters.department;
    const isTypeMatch = filters.type === "All" || doc.type === filters.type;
    const isNameMatch = doc.name
      .toLowerCase()
      .includes(filters.keywords.toLowerCase());
    const isDateMatch =
      (filters.dateRange[0] === null ||
        new Date(doc.lastModified) >= filters.dateRange[0]) &&
      (filters.dateRange[1] === null ||
        new Date(doc.lastModified) <= filters.dateRange[1]);
    return isDepartmentMatch && isTypeMatch && isNameMatch && isDateMatch;
  });

  const handleDeleteDocument = (docName) => {
    setDocuments(documents.filter((doc) => doc.name !== docName));
  };

  const handleViewDocument = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="h-screen w-screen flex flex-col p-6 bg-gray-100 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">
          <span className="text-yellow-500">Document</span>{" "}
          <span className="text-black">Directory</span>
        </h1>
        <div className="flex space-x-4">
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded-full flex items-center hover:bg-yellow-600 transition duration-300"
            onClick={handleUploadClick}
          >
            <FaUpload className="mr-2" />
            Upload Document
          </button>
        </div>
      </div>

      <div className="relative bg-white p-6 rounded-lg shadow-md">
        <div className="flex space-x-4 mb-4">
          <div className="flex items-center border rounded-full px-4 py-2 w-full">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={filters.keywords}
              onChange={(e) =>
                setFilters({ ...filters, keywords: e.target.value })
              }
              className="ml-2 outline-none w-full"
            />
          </div>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="border rounded-full px-4 py-2 outline-none"
          >
            <option value="All">All Types</option>
            <option value="Announcement">Announcement</option>
            <option value="Form">Form</option>
            <option value="Template">Template</option>
          </select>
          <select
            value={filters.department}
            onChange={(e) =>
              setFilters({ ...filters, department: e.target.value })
            }
            className="border rounded-full px-4 py-2 outline-none"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Company">Company</option>
          </select>
          <DatePicker
            selected={filters.dateRange[0]}
            onChange={handleDateChange}
            startDate={filters.dateRange[0]}
            endDate={filters.dateRange[1]}
            selectsRange
            isClearable
            className="border rounded-full px-4 py-2 outline-none"
            placeholderText="Select date range"
          />
        </div>

        <div className="overflow-y-auto max-h-96">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">File</th>
                <th className="py-2">Type</th>
                <th className="py-2">Department</th>
                <th className="py-2">Last Modified</th>
                <th className="py-2">Author</th>
                <th className="py-2">Comments</th>
                <th className="py-2">Views</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.name}>
                  <td className="py-2 flex items-center">
                    {doc.icon}
                    <span className="ml-2">{doc.name}</span>
                  </td>
                  <td className="py-2">{doc.type}</td>
                  <td className="py-2">{doc.department}</td>
                  <td className="py-2">{doc.lastModified}</td>
                  <td className="py-2">{doc.author}</td>
                  <td className="py-2">{doc.comments}</td>
                  <td className="py-2">{doc.views}</td>
                  <td className="py-2 flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleViewDocument(doc.url)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteDocument(doc.name)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Upload Document</h2>
            <input
              type="file"
              onChange={handleFileChange}
              className="mb-4"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Document Type
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="border rounded-full px-4 py-2 outline-none w-full"
              >
                <option value="Contract">Contract</option>
                <option value="Announcement">Announcement</option>
                <option value="Form">Form</option>
                <option value="Template">Template</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-full"
                onClick={handleFileUpload}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentDirectory;
