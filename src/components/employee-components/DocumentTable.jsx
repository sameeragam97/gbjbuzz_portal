import React from "react";

function DocumentTable() {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-yellow-300">
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Type</th>
          <th className="px-4 py-2 text-left">Department</th>
          <th className="px-4 py-2 text-left">Last Modified</th>
          <th className="px-4 py-2 text-left">Comments</th>
          <th className="px-4 py-2 text-left">Views</th>
        </tr>
      </thead>
      <tbody>
        <tr className="odd:bg-white even:bg-gray-100">
          <td className="px-4 py-2">Free Textbook as the New.pdf</td>
          <td className="px-4 py-2">Announcement</td>
          <td className="px-4 py-2">Engineering</td>
          <td className="px-4 py-2">5/6/24 by Sakshi Tikle</td>
          <td className="px-4 py-2">3</td>
          <td className="px-4 py-2">341</td>
        </tr>
        <tr className="odd:bg-white even:bg-gray-100">
          <td className="px-4 py-2">Employee Handbook.doc</td>
          <td className="px-4 py-2">Form</td>
          <td className="px-4 py-2">Company</td>
          <td className="px-4 py-2">10/6/24 by Prashant</td>
          <td className="px-4 py-2">1</td>
          <td className="px-4 py-2">34k</td>
        </tr>
        <tr className="odd:bg-white even:bg-gray-100">
          <td className="px-4 py-2">Digital Media 2024.ppt</td>
          <td className="px-4 py-2">Template</td>
          <td className="px-4 py-2">Company</td>
          <td className="px-4 py-2">15/6/24 by Sarthak</td>
          <td className="px-4 py-2">4</td>
          <td className="px-4 py-2">41k</td>
        </tr>
        <tr className="odd:bg-white even:bg-gray-100">
          <td className="px-4 py-2">Digital Media 2024.xls</td>
          <td className="px-4 py-2">Template</td>
          <td className="px-4 py-2">Marketing</td>
          <td className="px-4 py-2">15/6/24 by Sarthak</td>
          <td className="px-4 py-2">3</td>
          <td className="px-4 py-2">100</td>
        </tr>
      </tbody>
    </table>
  );
}

export default DocumentTable;
