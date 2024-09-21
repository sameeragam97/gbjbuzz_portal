import React, { useState } from 'react';

const FeedbackForm = () => {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  
  const [ratings, setRatings] = useState(Array(6).fill(null));
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const questions = [
    "How comfortable and conducive is the work environment?",
    "How supportive and approachable are the managers?",
    "How well do team members work together and support each other?",
    "How balanced is the workload with respect to personal life?",
    "How satisfied are you with your current role and responsibilities?",
    "How satisfied are you with the compensation and benefits package?",
  ];

  const ratingLabels = ["Excellent", "Good", "Fair", "Poor", "Very Poor"];

  const handleRatingChange = (index, value) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };

  const handleSubmit = () => {
    if (!date || !name || !department || ratings.includes(null)) {
      setError('Please fill out all fields and provide ratings for all questions.');
      return;
    }

    setIsModalOpen(true);
    setError(''); // Clear error if submission is successful
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDate('');
    setName('');
    setDepartment('');
    setRatings(Array(6).fill(null));
  };

  return (
    <div className="flex-1 mx-3 max-w-5xl mt-10 ml-10">
      <div>
        <h1 className="text-4xl font-bold">
          <span className="text-yellow-500">Feedback</span>{' '}
          <span className="text-black">Form</span>
        </h1>
      </div>

      <div className="w-[1300px] max-h-[575px] bg-white mt-10 rounded-2xl p-6 overflow-y-auto">
        <h2 className="text-md font-semibold mb-2">Date</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`w-[250px] p-1 border rounded mb-4 ${!date && error ? 'border-red-500 bg-red-100' : ''}`}
        />
        
        <h2 className="text-md font-semibold mb-2">Name</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-[250px] p-1 border rounded mb-4 ${!name && error ? 'border-red-500 bg-red-100' : ''}`}
          placeholder="Enter your name"
        />
        
        <h2 className="text-md font-semibold mb-2">Department</h2>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className={`w-[250px] p-1 border rounded mb-4 ${!department && error ? 'border-red-500 bg-red-100' : ''}`}
        >
          <option value="" disabled>Select your department</option>
          <option value="Design">Design</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
        </select>

        <h2 className="text-lg font-semibold mb-4 mt-4">Kindly share your feedback with us</h2>

        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2"></th>
              {ratingLabels.map((label, index) => (
                <th className="border px-4 py-2" key={index}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{question}</td>
                {[...Array(5)].map((_, i) => (
                  <td className="border px-4 py-2" key={i}>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={i}
                        onChange={() => handleRatingChange(index, i)}
                        className="form-radio"
                        style={{ accentColor: ratings[index] === i ? 'yellow' : undefined }}
                      />
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Feedback Summary</h2>
            <p>Date: {date}</p>
            <p>Name: {name}</p>
            <p>Department: {department}</p>
            <h3 className="text-lg font-semibold mt-4">Ratings:</h3>
            <ul className="list-disc pl-5">
              {questions.map((question, index) => (
                <li key={index}>
                  {question} - {ratings[index] !== null ? `Rating: ${ratingLabels[ratings[index]]}` : 'Not Rated'}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
