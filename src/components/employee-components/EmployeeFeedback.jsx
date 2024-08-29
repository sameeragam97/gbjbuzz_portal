import React, { useState } from 'react';

const FeedbackForm = () => {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [feedback, setFeedback] = useState({
    workEnvironment: '',
    support: '',
    teamwork: '',
    workload: '',
    roleSatisfaction: '',
    compensation: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFeedbackChange = (e, field) => {
    setFeedback({ ...feedback, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const validationErrors = {};

    if (!date) validationErrors.date = 'Date is required.';
    if (!name) validationErrors.name = 'Full Name is required.';
    if (!department) validationErrors.department = 'Department is required.';

    Object.keys(feedback).forEach((key) => {
      if (!feedback[key]) {
        validationErrors[key] = 'This field is required.';
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Handle form submission logic here
    console.log('Form submitted with the following data:', {
      date,
      name,
      department,
      feedback,
    });
    setShowPopup(true);
    setErrors({}); // Clear errors on successful submission
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="p-8 bg-[#E1AD01] rounded-lg shadow-md ml-96 mt-20">
      <h1 className="text-2xl font-bold text-center mb-6">Employee Feedback Form</h1>
      <div className="border-t-2 border-black w-1/3 mx-auto mb-6"></div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-black font-bold mb-1">DATE</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}
          </div>
          <div>
            <label className="block text-black font-bold mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-black font-bold mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>Select</option>
              <option value="Design Department">Design Department</option>
              <option value="HR Department">HR Department</option>
              <option value="IT Department">IT Department</option>
              {/* Add more options as needed */}
            </select>
            {errors.department && <p className="text-red-600 text-sm">{errors.department}</p>}
          </div>
        </div>

        <h2 className="mt-8 font-bold text-lg">Kindly share your feedback with us</h2>

        <div className="mt-4 space-y-4">
          {[
            {
              label: 'How comfortable and conducive is the work environment?',
              field: 'workEnvironment',
            },
            {
              label: 'How supportive and approachable are the managers?',
              field: 'support',
            },
            {
              label: 'How well do team members work together and support each other?',
              field: 'teamwork',
            },
            {
              label: 'How balanced is the workload with respect to personal life?',
              field: 'workload',
            },
            {
              label: 'How satisfied are you with your current role and responsibilities?',
              field: 'roleSatisfaction',
            },
            {
              label: 'How satisfied are you with the compensation and benefits package?',
              field: 'compensation',
            },
          ].map(({ label, field }) => (
            <div key={field} className="flex flex-col mb-4">
              <label className="text-black font-medium whitespace-pre-wrap break-words">{label}</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {['EXCELLENT', 'GOOD', 'FAIR', 'POOR', 'VERY POOR'].map((option) => (
                  <label key={option} className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name={field}
                      value={option}
                      onChange={(e) => handleFeedbackChange(e, field)}
                      className="form-radio"
                    />
                    <span className="text-black">{option}</span>
                  </label>
                ))}
              </div>
              {errors[field] && <p className="text-red-600 text-sm">{errors[field]}</p>}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white font-bold rounded hover:bg-gray-800"
          >
            Submit
          </button>
        </div>
      </form>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-bold mb-4">Your response has been submitted!</h3>
            <button
              onClick={handleClosePopup}
              className="px-4 py-2 bg-black text-white font-bold rounded hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
