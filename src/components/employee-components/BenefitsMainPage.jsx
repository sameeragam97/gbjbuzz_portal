import React from "react";
import health from "../../assets/health.png"
import work from "../../assets/work.png"
import time from "../../assets/time.png"
import bonus from "../../assets/bonus.png"
import commuter from "../../assets/commuter.png"
import discount from "../../assets/discount.png"



const BenefitCard = ({ icon, title, description, status }) => (
  <div className="bg-white w-60 rounded-2xl shadow-lg p-4 flex flex-col items-center">
    <img src={icon} alt={title} className="w-12 h-12 mb-2" />
    <h3 className="font-bold text-lg mb-1">{title}</h3>
    <p className="text-sm text-gray-600 text-center mb-2">{description}</p>
    <button
      className={`px-4 py-1 rounded-full text-sm ${
        status === "Apply"
          ? "bg-yellow-500 text-white"
          : status === "Approved"
          ? "bg-green-500 text-white"
          : "bg-orange-500 text-white"
      }`}
    >
      {status}
    </button>
  </div>
);

const BenefitsMainPage = () => {
  const benefits = [
    {
      icon: `${health}`,
      title: "Health Insurance",
      description: "Medical, dental and vision coverage",
      status: "Apply",
    },
    {
      icon: `${time}`,
      title: "Paid Time Off",
      description: "Vacation days, sick leave, and holiday",
      status: "Approved",
    },
    {
      icon: `${work}`,
      title: "Flexible Work",
      description: "Remote Work, flexible hours compressed workweeks",
      status: "Applied",
    },
    {
      icon: `${bonus}`,
      title: "Bonuses & Incentives",
      description: "Performance bonuses, and profit sharing plans.",
      status: "Apply",
    },
    {
      icon: `${commuter}`,
      title: "Commuter Benefits",
      description: "Subsidized transportation or parking.",
      status: "Apply",
    },
    {
      icon: `${discount}`,
      title: "Employee Discount",
      description: "Discount on company product or services.",
      status: "Apply",
    },
  ];

  return (
    <div className="w-full m-auto p-10 flex flex-col items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 text-yellow-500">BENEFITS</h1>
        <p className=" w-2/5 mb-9 text-gray-600 text-center">
          This section highlights the various perks and advantages the company
          provides to its employees, showcasing our commitment to their
          well-being and professional growth.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} {...benefit} />
        ))}
      </div>
    </div>
  );
};

export default BenefitsMainPage;
