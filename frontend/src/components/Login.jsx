import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "student",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("Home");
  const navItems = ["Home", "Skillpack", "Gigs", "Mentor", "Leaderboard"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="relative px-8 py-5 shadow-md bg-[#020106] border-b border-[#1E1B2E]">
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

      <div className="min-h-screen bg-[#020106] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Welcome back to HUSTLee
          </h2>
          <p className="mt-2 text-center text-sm text-[#9CA9AE]">
            Sign in to continue your journey
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <div className="flex w-full max-w-md rounded-md overflow-hidden border border-[#485363]">
            {["student", "mentor"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, userType: type }))
                }
                className={`flex-1 py-2 text-sm font-medium transition-all duration-200 ${
                  formData.userType === type
                    ? "text-white bg-gradient-to-b from-[#5C43F6] to-[#BC61F3]"
                    : "text-[#9CA9AE] bg-[#1E2939] hover:bg-[#2C3A4E]"
                }`}
              >
                {type === "student" ? "Login as Student" : "Login as Mentor"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-[#020106] py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
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
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#9CA9AE]"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Your email address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none text-white block w-full px-3 bg-[#1E2939] py-2 border border-[#485363] rounded-md shadow-sm placeholder-[#485363] focus:outline-none sm:text-sm focus:outline-none focus:ring-1"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#9CA9AE]"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Type your password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none text-white block w-full px-3 py-2 bg-[#1E2939] border border-[#485363] rounded-md shadow-sm placeholder-[#485363] focus:outline-none sm:text-sm focus:outline-none focus:ring-1"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 accent-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-[#9CA9AE]"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-[#BC61F3] hover:text-purple-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white transition-all duration-300 
      bg-gradient-to-b from-[#5C43F6] to-[#BC61F3] hover:opacity-90 
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C43F6] 
      ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
                >
                  {loading ? (
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
                  ) : null}
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full" />
                </div>
                <div className="relative flex flex-col items-center text-sm">
                  <span className="px-2 text-[#9CA9AE]">Or continue with</span>

                  {/* added Google login button here */}
                  <button
                    onClick={googleLogin}
                    type="button"
                    className="mt-4 w-full flex items-center justify-center py-2 px-4 border border-[#485363] rounded-md shadow-sm bg-[#1E2939] text-white hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google logo"
                      className="h-5 w-5 mr-2"
                    />
                    Sign in with Google
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-center text-sm text-[#9CA9AE]">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-[#BC61F3] hover:text-purple-500"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Login;
