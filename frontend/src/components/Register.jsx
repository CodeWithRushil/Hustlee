import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

// Define a list of common skills
const commonSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Data Science",
  "UI/UX",
  "DevOps",
  "Mobile Development",
  "Java",
  "C++",
  "Ruby",
  "PHP",
  "SQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Kubernetes",
  "Machine Learning",
  "AI",
  "Blockchain",
];

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [active, setActive] = useState("Home");
  const navItems = ["Home", "Skillpack", "Gigs", "Mentor", "Leaderboard"];
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "student",
    name: "",
    // Student specific fields
    education: "",
    skills: [],
    interests: [],
    // Mentor specific fields
    expertise: [],
    yearsOfExperience: "",
    hourlyRate: "",
    // Company specific fields
    companyName: "",
    industry: "",
    size: "",
    website: "",
    // Employee specific fields
    department: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayInput = (e, field) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setFormData((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    // Validate user type specific fields
    switch (formData.userType) {
      case "student":
        if (!formData.education) {
          setError("Education is required for students");
          return false;
        }
        break;
      case "mentor":
        if (
          !formData.expertise.length ||
          !formData.yearsOfExperience ||
          !formData.hourlyRate
        ) {
          setError("Please fill in all mentor-specific fields");
          return false;
        }
        break;
      case "company":
        if (!formData.companyName || !formData.industry) {
          setError("Please fill in all company-specific fields");
          return false;
        }
        break;
      case "employee":
        if (!formData.department || !formData.role) {
          setError("Please fill in all employee-specific fields");
          return false;
        }
        break;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Remove confirmPassword from the request
      const { confirmPassword, ...registrationData } = formData;

      const response = await fetch(
        "https://hustlee-9d22.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors
        if (data.errors && Array.isArray(data.errors)) {
          // Multiple validation errors
          throw new Error(data.errors.join("\n"));
        } else if (data.message) {
          // Single error message
          throw new Error(data.message);
        } else {
          throw new Error(
            "Registration failed. Please check your input and try again."
          );
        }
      }

      // Store token and user data
      localStorage.setItem("token", data.token);
      login(data.user);

      // Redirect based on user type
      switch (data.user.userType) {
        case "student":
          navigate("/dashboard");
          break;
        case "mentor":
          navigate("/mentor/dashboard");
          break;
        case "company":
          navigate("/company/dashboard");
          break;
        case "employee":
          navigate("/employee/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      // Format error message for display
      const errorMessage = err.message.split("\n").map((line, index) => (
        <div key={index} className="mb-1">
          {line}
        </div>
      ));
      setError(errorMessage);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderUserTypeFields = () => {
    switch (formData.userType) {
      case "student":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="education"
                className="block text-sm font-medium text-[#9CA9AE]"
              >
                Education
              </label>
              <input
                type="text"
                name="education"
                id="education"
                value={formData.education}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md px-3 border border-[#485363] text-white shadow-sm bg-[#1E2939] placeholder-[#485363] py-2 text-sm focus:outline-none focus:ring-1"
                placeholder="e.g. Bachelor's in Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#9CA9AE]">
                Skills
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {commonSkills.map((skill) => (
                  <label key={skill} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={(e) => {
                        const newSkills = e.target.checked
                          ? [...formData.skills, skill]
                          : formData.skills.filter((s) => s !== skill);
                        setFormData((prev) => ({ ...prev, skills: newSkills }));
                      }}
                      className="accent-blue-600 focus:ring-blue-600 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-[#6F7E87]">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case "mentor":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-[#9CA9AE]">
                Expertise
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {commonSkills.map((skill) => (
                  <label key={skill} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.expertise.includes(skill)}
                      onChange={(e) => {
                        const newExpertise = e.target.checked
                          ? [...formData.expertise, skill]
                          : formData.expertise.filter((s) => s !== skill);
                        setFormData((prev) => ({
                          ...prev,
                          expertise: newExpertise,
                        }));
                      }}
                      className="rounded border-gray-300 accent-blue-600 focus:ring-blue-600"
                    />
                    <span className="ml-2 text-sm text-[#6F7E87]">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="yearsOfExperience"
                className="block text-sm font-medium text-[#9CA9AE]"
              >
                Years of Experience
              </label>
              <input
                type="number"
                name="yearsOfExperience"
                id="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md px-3 border border-[#485363] text-white shadow-sm bg-[#1E2939] placeholder-[#485363] py-2 text-sm focus:outline-none focus:ring-1"
                min="0"
                placeholder="e.g. 5"
              />
            </div>
            <div>
              <label
                htmlFor="hourlyRate"
                className="block text-sm font-medium text-[#9CA9AE]"
              >
                Hourly Rate (USD)
              </label>

              <div className="mt-1 relative rounded-md shadow-sm">
                {/* Left $ symbol */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-base">$</span>
                </div>

                {/* Input field */}
                <input
                  type="number"
                  name="hourlyRate"
                  id="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-[#485363] text-white shadow-sm bg-[#1E2939] placeholder-[#485363] py-2 pl-6 pr-12 text-sm focus:outline-none focus:ring-1"
                  min="0"
                  placeholder="0.00"
                />

                {/* Right /hr label */}
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">/hr</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case "company":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-[#9CA9AE]"
              >
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                id="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="appearance-none text-white block w-full px-3 py-2 bg-[#1E2939] border border-[#485363] rounded-md shadow-sm placeholder-[#485363] focus:outline-none sm:text-sm focus:outline-none focus:ring-1 mt-1"
                placeholder="e.g. Tech Solutions Inc."
              />
            </div>
            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-medium text-[#9CA9AE]"
              >
                Industry
              </label>
              <input
                type="text"
                name="industry"
                id="industry"
                value={formData.industry}
                onChange={handleChange}
                className="appearance-none text-white block w-full px-3 py-2 bg-[#1E2939] border border-[#485363] rounded-md shadow-sm placeholder-[#485363] focus:outline-none sm:text-sm focus:outline-none focus:ring-1 mt-1"
                placeholder="e.g. Software Development"
              />
            </div>
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-medium text-[#9CA9AE]"
              >
                Company Size
              </label>
              <select
                name="size"
                id="size"
                value={formData.size}
                onChange={handleChange}
                className="appearance-none text-white block w-full px-3 py-2 bg-[#1E2939] border border-[#485363] rounded-md shadow-sm placeholder-[#485363] focus:outline-none sm:text-sm focus:outline-none focus:ring-1 mt-1"
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501+">501+ employees</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-[#9CA9AE]"
              >
                Website
              </label>
              <input
                type="url"
                name="website"
                id="website"
                value={formData.website}
                onChange={handleChange}
                className="appearance-none text-white block w-full px-3 py-2 bg-[#1E2939] border border-[#485363] rounded-md shadow-sm placeholder-[#485363] focus:outline-none sm:text-sm focus:outline-none focus:ring-1 mt-1"
                placeholder="e.g. https://www.company.com"
              />
            </div>
          </motion.div>
        );
      case "employee":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-[#9CA9AE]"
              >
                Department
              </label>
              <input
                type="text"
                name="department"
                id="department"
                value={formData.department}
                onChange={handleChange}
                className="appearance-none text-white block w-full px-3 py-2 bg-[#1E2939] border border-[#485363] rounded-md shadow-sm placeholder-[#485363] focus:outline-none sm:text-sm focus:outline-none focus:ring-1 mt-1"
                placeholder="e.g. Engineering"
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-[#9CA9AE]"
              >
                Role
              </label>
              <input
                type="text"
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="appearance-none text-white block w-full px-3 py-2 bg-[#1E2939] border border-[#485363] rounded-md shadow-sm placeholder-[#485363] focus:outline-none sm:text-sm focus:outline-none focus:ring-1 mt-1"
                placeholder="e.g. Senior Developer"
              />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <nav className="relative px-8 py-4 shadow-md bg-[#020106]">
        <div className="flex items-center justify-between">
          {/* Left: Logo (linked to Home) */}
          <Link
            to="/"
            className="flex items-center space-x-3 cursor-pointer flex-shrink-0"
          >
            <img
              src="/Hustlee_Logo.png"
              alt="Logo Icon"
              className="h-10 w-10 object-contain"
            />
            <img
              src="/HUSTLee.png"
              alt="Logo Text"
              className="h-8 object-contain"
            />
          </Link>

          {/* Right: Buttons */}
          <div className="flex space-x-4 items-center flex-shrink-0">
            {/* Login Button */}
            <Link to="/login">
              <button
                className="w-32 px-3 py-1.5 rounded-full text-white font-semibold shadow-md hover:opacity-90 transition-all duration-200"
                style={{
                  background: "linear-gradient(to bottom, #5C43F6, #BC61F3)",
                }}
              >
                Login
              </button>
            </Link>

            {/* Sign Up Button */}
            <Link to="/register">
              <button
                className="relative w-32 px-3 py-1.5 rounded-full font-semibold text-transparent transition-all duration-300 overflow-hidden group"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, #5C43F6, #BC61F3)",
                  WebkitBackgroundClip: "text",
                  border: "2px solid transparent",
                  backgroundOrigin: "border-box",
                }}
              >
                <span
                  className="absolute inset-0 rounded-full p-[2px]"
                  style={{
                    background: "linear-gradient(to bottom, #5C43F6, #BC61F3)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                <span className="text-white relative z-10 group-hover:text-white transition-all duration-300">
                  Sign Up
                </span>
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    background: "linear-gradient(to bottom, #5C43F6, #BC61F3)",
                  }}
                />
              </button>
            </Link>
          </div>
        </div>

        {/* Center Nav Links */}
        <ul
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-10 pointer-events-auto"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <li
              key={item}
              onClick={() => setActive(item)}
              className={`cursor-pointer pb-1 hover:text-[#BC61F3] transition-all duration-200 ${
                active === item
                  ? "text-[#BC61F3] border-b-2 border-[#BC61F3]"
                  : "border-b-2 border-transparent text-white"
              }`}
            >
              <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="min-h-screen bg-[#020106] py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-[#9CA9AE]">
              Join HUSTLee and start your journey
            </p>
          </div>

          <div className="bg-[#020106] py-8 px-4 shadow-xl rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-md bg-red-50 p-4"
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm text-red-700">{error}</div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#9CA9AE] mb-2">
                    Account Type
                  </label>

                  <div className="flex w-full rounded-md overflow-hidden border border-[#485363]">
                    {["student", "mentor", "company", "employee"].map(
                      (type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, userType: type }))
                          }
                          className={`flex-1 py-3 text-sm font-medium transition-all duration-200 ${
                            formData.userType === type
                              ? "text-white bg-gradient-to-b from-[#5C43F6] to-[#BC61F3]"
                              : "text-[#9CA9AE] bg-[#1E2939] hover:bg-[#2C3A4E]"
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#9CA9AE]"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md px-3 border border-[#485363] text-white shadow-sm bg-[#1E2939] placeholder-[#485363] py-2 text-sm focus:outline-none focus:ring-1"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#9CA9AE]"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md px-3 border border-[#485363] text-white shadow-sm bg-[#1E2939] placeholder-[#485363] py-2 text-sm focus:outline-none focus:ring-1"
                    placeholder="Your email address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#9CA9AE]"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md px-3 border border-[#485363] text-white shadow-sm bg-[#1E2939] placeholder-[#485363] py-2 text-sm focus:outline-none focus:ring-1"
                    placeholder="Type your password"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-[#9CA9AE]"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md px-3 border border-[#485363] text-white shadow-sm bg-[#1E2939] placeholder-[#485363] py-2 text-sm focus:outline-none focus:ring-1"
                    placeholder="Confirm your password"
                  />
                </div>

                {renderUserTypeFields()}
              </div>

              <div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white transition-all duration-300 
      bg-gradient-to-b from-[#5C43F6] to-[#BC61F3] hover:opacity-90 
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C43F6] 
      ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating account...
                    </div>
                  ) : (
                    "Create account"
                  )}
                </motion.button>
              </div>

              <div className="text-center">
                <p className="text-sm text-[#9CA9AE]">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-[#BC61F3] hover:text-purple-500"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;
