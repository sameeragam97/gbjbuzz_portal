import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileExcel } from "react-icons/fa";
import { BsSearch, BsFilter } from "react-icons/bs";
import { FiPlus, FiUpload } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";

const LegalCompliancePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [documents, setDocuments] = useState([
    {
      name: "Free Textbook as the New.pdf",
      type: "Announcement",
      department: "Engineering",
      date: "2024-05-06",
      downloads: 3,
      views: 341,
      icon: FaFilePdf,
      iconColor: "text-red-500",
    },
    {
      name: "Employee Handbook.doc",
      type: "Form",
      department: "Company",
      date: "2024-10-06",
      downloads: 1,
      views: 34000,
      icon: FaFileWord,
      iconColor: "text-blue-500",
    },
    {
      name: "Digital Media 2024.ppt",
      type: "Template",
      department: "Company",
      date: "2024-06-15",
      downloads: 4,
      views: 41000,
      icon: FaFilePowerpoint,
      iconColor: "text-orange-500",
    },
    {
      name: "Digital Media 2024.xls",
      type: "Template",
      department: "Marketing",
      date: "2024-06-15",
      downloads: 3,
      views: 100,
      icon: FaFileExcel,
      iconColor: "text-green-500",
    },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDocument, setNewDocument] = useState(null);
  const [newDocumentType, setNewDocumentType] = useState("");
  const [newDocumentDepartment, setNewDocumentDepartment] = useState("");

  const filterDocuments = () => {
    return documents.filter((document) => {
      const matchesSearch = document.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType ? document.type === selectedType : true;
      const matchesDepartment = selectedDepartment ? document.department === selectedDepartment : true;
      const matchesDateRange =
        (!startDate || new Date(document.date) >= new Date(startDate)) &&
        (!endDate || new Date(document.date) <= new Date(endDate));

      return matchesSearch && matchesType && matchesDepartment && matchesDateRange;
    });
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleFileChange = (event) => {
    setNewDocument(event.target.files[0]);
  };

  const handleUpload = () => {
    if (newDocument && newDocumentType && newDocumentDepartment) {
      const newDoc = {
        name: newDocument.name,
        type: newDocumentType,
        department: newDocumentDepartment,
        date: new Date().toISOString().split("T")[0], // Current date
        downloads: 0,
        views: 0,
        icon:
          newDocument.name.endsWith(".pdf")
            ? FaFilePdf
            : newDocument.name.endsWith(".doc") || newDocument.name.endsWith(".docx")
            ? FaFileWord
            : newDocument.name.endsWith(".ppt") || newDocument.name.endsWith(".pptx")
            ? FaFilePowerpoint
            : FaFileExcel,
        iconColor:
          newDocument.name.endsWith(".pdf")
            ? "text-red-500"
            : newDocument.name.endsWith(".doc") || newDocument.name.endsWith(".docx")
            ? "text-blue-500"
            : newDocument.name.endsWith(".ppt") || newDocument.name.endsWith(".pptx")
            ? "text-orange-500"
            : "text-green-500",
      };

      setDocuments([...documents, newDoc]);
      setShowUploadModal(false);
      setNewDocument(null);
      setNewDocumentType("");
      setNewDocumentDepartment("");
    }
  };

  const handleView = (index) => {
    // Implement view logic here
    alert(`View document: ${documents[index].name}`);
  };

  const handleDelete = (index) => {
    // Implement delete logic here
    const updatedDocuments = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocuments);
  };

  const filteredDocuments = filterDocuments();

  return (
    <div className="flex-1 flex flex-col p-6 bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <span className="text-[#E1AD01]">Legal</span> Compliance
        </h1>
        <div className="flex space-x-4">
          <button className="bg-[#E1AD01] text-white font-semibold py-2 px-4 rounded-md flex items-center">
            <FiPlus className="mr-2" /> New Document
          </button>
          <button
            className="bg-black text-white font-semibold py-2 px-4 rounded-md flex items-center"
            onClick={handleUploadClick}
          >
            <FiUpload className="mr-2" /> Upload Document
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="mt-6 bg-gray-100 p-4 rounded-md">
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white p-2 rounded-md">
            <BsSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Keywords"
              className="bg-transparent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center bg-white p-2 rounded-md">
            <span className="text-gray-400 mr-2">Type</span>
            <select
              className="bg-transparent outline-none"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All</option>
              <option value="Announcement">Announcement</option>
              <option value="Form">Form</option>
              <option value="Template">Template</option>
            </select>
          </div>
          <div className="flex items-center bg-white p-2 rounded-md">
            <span className="text-gray-400 mr-2">Date Range</span>
            <input
              type="date"
              className="bg-transparent outline-none"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="mx-2">to</span>
            <input
              type="date"
              className="bg-transparent outline-none"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="flex items-center bg-white p-2 rounded-md">
            <span className="text-gray-400 mr-2">Department</span>
            <select
              className="bg-transparent outline-none"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Company">Company</option>
            </select>
          </div>
          <button className="bg-[#E1AD01] text-white py-2 px-4 rounded-md flex items-center">
            <BsFilter className="mr-2" /> Filter
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="mt-6">
        <table className="min-w-full bg-white rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Type</th>
              <th className="text-left py-3 px-4">Department</th>
              <th className="text-left py-3 px-4">Last Modified</th>
              <th className="text-center py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((document, index) => (
              <tr key={index}>
                <td className="py-3 px-4 flex items-center">
                  <document.icon className={`mr-2 ${document.iconColor}`} />
                  {document.name}
                </td>
                <td className="py-3 px-4">{document.type}</td>
                <td className="py-3 px-4">{document.department}</td>
                <td className="py-3 px-4">{document.date}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleView(index)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <AiOutlineEye size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
            <input type="file" onChange={handleFileChange} />
            <div className="mt-4">
              <label className="block text-sm font-medium">Type</label>
              <input
                type="text"
                value={newDocumentType}
                onChange={(e) => setNewDocumentType(e.target.value)}
                className="border border-gray-300 rounded-md w-full p-2"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Department</label>
              <input
                type="text"
                value={newDocumentDepartment}
                onChange={(e) => setNewDocumentDepartment(e.target.value)}
                className="border border-gray-300 rounded-md w-full p-2"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleUpload}
                className="bg-[#E1AD01] text-white font-semibold py-2 px-4 rounded-md"
              >
                Upload
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md ml-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalCompliancePage;
