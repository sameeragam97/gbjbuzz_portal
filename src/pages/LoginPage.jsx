import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/loginbg.jpeg";
import gbjlogo from "../assets/logo.png";
import EmailIcon from "../assets/icons/EmailIcon";
import PasswordIcon from "../assets/icons/PasswordIcon";
import SplashScreen from "../components/SplashScreen/SplashScreen";

const LoginPage = ({ showLogo }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  // Function to handle animation end
  const handleAnimationEnd = () => {
    setShowSplash(false); // Set showSplash to false when animation ends
    setShowForm(true); // Show the login form
  };

  useEffect(() => {
    if (showLogo) {
      setTimeout(() => {
        setShowForm(true); // Show the form after a short delay (if needed)
      }, 100); // Optional delay
    }
  }, [showLogo]);

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Hardcoded credentials for demonstration
    const validUserCredentials = {
      username: "user",
      password: "password",
      role: "employee", // Can be "employee" or "hr"
    };
  
    const validHrCredentials = {
      username: "hr",
      password: "hrpassword",
      role: "hr",
    };
  
    const validSalesCredentials = {
      username: "sales",
      password: "salespassword",
      role: "sales",
    };
  
    if (
      username === validUserCredentials.username &&
      password === validUserCredentials.password
    ) {
      navigate("/home"); // Navigate to employee homepage
    } else if (
      username === validHrCredentials.username &&
      password === validHrCredentials.password
    ) {
      navigate("/hr-home"); // Navigate to HR homepage
    } else if (
      username === validSalesCredentials.username &&
      password === validSalesCredentials.password
    ) {
      navigate("/sales-home"); // Navigate to SALES homepage
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  if (showSplash) {
    return <SplashScreen onAnimationEnd={handleAnimationEnd} />;
  }

  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${backgroundImage})`,
      }}
    >
      {/* Login form structure */}
      <div
        className={`absolute top-0 right-0 p-4 logo-container ${
          showLogo ? "visible" : ""
        }`}
      >
        <img src={gbjlogo} alt="GBJ Logo" className="h-20" />
      </div>
      <div
        className={`flex items-center justify-center h-screen ${
          showForm ? "form-visible" : ""
        }`}
      >
        <form
          onSubmit={handleLogin}
          className="bg-slate-50 rounded-3xl shadow-md login-form"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            width: "30%",
            height: "80%",
            padding: "70px 60px 10px 60px",
            borderRadius: "50px",
          }}
        >
          {/* Logo and title components */}
          <div
            className="logo-container flex items-center justify-center mb-4"
            style={{
              backgroundColor: "black",
              height: "30px",
              width: "32%",
              borderRadius: "20px",
              margin: "0 0 40px 0",
            }}
          >
            <img src={gbjlogo} alt="GBJBUZZ Logo" className="h-6" />
            <p
              className="text-yellow-500 text-xs font-bold ml-0"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              GBJBUZZ
            </p>
          </div>
          <p
            className="text-lg font-bold"
            style={{ fontFamily: "Inter, sans-serif", color: "#2A2A2A" }}
          >
            Login to your Account
          </p>
          <p
            className="text-xs font-bold mb-4"
            style={{ fontFamily: "Inter, sans-serif", color: "#2A2A2A" }}
          >
            Welcome back!
          </p>

          {/* Email input */}
          <div className="relative mb-4">
            <label className="block mb-2 font-bold text-xs" htmlFor="username">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <EmailIcon className="w-5 h-2" />
              </span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 pl-12 rounded-xl bg-white bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-orange-800 transition duration-200 ease-in-out placeholder-gray-400"
                style={{
                  height: "40px",
                  fontFamily: "Inter, sans-serif",
                  color: "black",
                  fontSize: "0.9rem",
                }}
                placeholder="Enter your Email"
                aria-label="Username"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="relative mb-4">
            <label className="block mb-2 font-bold text-xs" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <PasswordIcon className="w-5 h-5" />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 pl-12 rounded-xl bg-white bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-orange-800 transition duration-200 ease-in-out placeholder-gray-400"
                style={{
                  height: "40px",
                  fontFamily: "Inter, sans-serif",
                  color: "black",
                  fontSize: "0.9rem",
                }}
                placeholder="Enter your Password"
                aria-label="Password"
              />
            </div>
          </div>

          {/* Forgot password link */}
          <div className="-mt-3 mb-5">
            <a href="#" className="text-blue-800 text-xs">
              Forgot Password?
            </a>
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              className="rounded-3xl bg-orange-700 hover:bg-orange-800 transition duration-300 ease-in-out"
              type="submit"
              style={{
                color: "#fff",
                border: "none",
                padding: "0px 00px",
                fontSize: "15px",
                fontWeight: 500,
                cursor: "pointer",
                marginTop: "20px",
                alignSelf: "center",
                height: "40px",
                width: "150px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
