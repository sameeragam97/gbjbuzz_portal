import React from "react";
import { useNavigate } from "react-router-dom";
import jobPostingImage from "../../assets/jobpositng.png";
import atsImage from "../../assets/ats.png";

const HiringProcessMainPage = () => {
  return (
    <div className="w-full m-auto flex flex-col justify-center items-center gap-4 p-8 mt-28">
      <h1 className="text-3xl font-bold mb-8">
        <span className="text-yellow-500">Hiring</span> Process
      </h1>
      <div className="flex justify-center gap-10">
        <ProcessCard
          title="Job Posting"
          imageSrc={jobPostingImage}
          altText="Office chair with 'Vacancy' sign"
          redirectTo="/hiring-processes/job-posting"
        />
        <ProcessCard
          title="ATS"
          imageSrc={atsImage}
          altText="Person presenting data charts"
          redirectTo="/hiring-processes/ats"
        />
      </div>
    </div>
  );
};

const ProcessCard = ({ title, imageSrc, altText, redirectTo }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(redirectTo);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 w-64 text-center">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="mb-4 h-40 flex items-center justify-center">
        <img src={imageSrc} alt={altText} className="max-w-full max-h-full object-contain" />
      </div>
      <button
        className="bg-yellow-400 text-white px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors"
        onClick={handleRedirect}
      >
        Open
      </button>
    </div>
  );
};

export default HiringProcessMainPage;
