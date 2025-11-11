import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
  viewport: { once: true },
});

const Home = () => {
  const [active, setActive] = useState("Home");
  const navItems = ["Home", "Skillpack", "Gigs", "Mentor", "Leaderboard"];
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
      
      <div className="bg-[#020106] text-white overflow-hidden">
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between pt-24 pb-20 px-4 md:px-16">
          {/* Left Text Section */}
          <motion.div
            {...fadeIn(0.2)}
            className="flex-1 text-center md:text-left mt-10 md:mt-0"
          >
            {/* Gradient Heading */}
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-[#735ff7ff] via-[#c4b6ccff] to-[#BC61F3] text-transparent bg-clip-text">
              Learn <br /> Get Verified <br /> Earn
            </h1>

            <p className="text-[#BCBCBC] max-w-lg mb-6 text-base md:text-lg">
              Join HUSTLee — where you learn, get verified, and make connections
              along your grind.
            </p>

            <motion.button
              {...fadeIn(0.4)}
              className="px-8 py-3 rounded-full text-white font-semibold shadow-md hover:opacity-90 transition-all duration-200"
              style={{
                background: "linear-gradient(to bottom, #5C43F6, #BC61F3)",
              }}
            >
              Get Started
            </motion.button>
          </motion.div>

          {/* Right Image Placeholder */}
          <motion.div
            {...fadeIn(0.5)}
            className="flex-1 flex justify-center md:justify-end"
          >
            <img
              src="https://placehold.co/450x350/1E1B2E/FFFFFF?text=Hero+Image"
              alt="Hero Placeholder"
              className="w-full max-w-md rounded-lg shadow-lg object-contain"
            />
          </motion.div>
        </section>

        {/* Floating Options */}
        <section className="py-20 px-6 md:px-16 bg-[#020106] text-white text-center">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[
              { emoji: "🎯", text: "Explore Gigs" },
              { emoji: "🧠", text: "Upgrade Skills" },
              { emoji: "👨‍🏫", text: "Work on real gigs" },
              { emoji: "💰", text: "Connect with mentors" },
              { emoji: "🏆", text: "Grow your career" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex cursor-pointer items-center space-x-3 rounded-xl px-5 py-4 backdrop-blur-sm shadow-lg hover:shadow-[#BC61F3]/40 transition-all duration-300"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-sm md:text-base font-medium text-[#E5E5E5]">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Gigs Section */}
        <section className="text-center py-16 px-4 md:px-8">
          <motion.h2
            {...fadeIn(0.2)}
            className="text-3xl font-bold mb-2 uppercase"
          >
            Earn with <span className="text-[#FDD835] font-medium">Gigs</span>
          </motion.h2>
          <motion.p {...fadeIn(0.4)} className="text-[#9CA9AE] mb-10">
            Explore real-world opportunities to put your skills to work.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                {...fadeIn(i * 0.1 + 0.3)}
                key={i}
                className="relative w-60 h-80 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                {/* Background Image */}
                <img
                  src={i % 2 === 0 ? "./g1x.png" : "./g2x.png"}
                  alt={`Gig ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Floating Info Box */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[85%] bg-[#1E1B2E]/95 backdrop-blur-md rounded-xl shadow-lg border border-[#5C43F6]/40 px-4 py-3">
                  <h3 className="font-semibold text-lg text-white">
                    Frontend Developer
                  </h3>
                  <p className="text-sm text-[#9CA9AE] mt-1">
                    Build stunning interfaces with modern tools.
                  </p>
                </div>

                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skillpacks Section */}
        <section className="text-center py-20 bg-gradient-to-b from-[#100A24] to-[#020106]">
          <motion.h2
            {...fadeIn(0.2)}
            className="text-3xl font-bold mb-10 uppercase"
          >
            Explore <span className="text-[#FDD835]">Skillpacks</span>
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-10">
            {["Web Dev", "ML & AI", "Data Science", "Blockchain"].map(
              (skill, i) => (
                <motion.div
                  {...fadeIn(i * 0.1 + 0.3)}
                  key={skill}
                  className="bg-[#1E1B2E] p-6 rounded-xl w-56 text-center hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                  {/* Clean Circle Image (no border, no gradient) */}
                  <div className="h-40 w-40 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={`./sp${i + 1}.png`}
                      alt={skill}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-lg mb-3">{skill}</h3>

                  {/* View Details Button */}
                  <button
                    className="mt-2 px-4 py-2 w-full rounded-lg font-medium text-white text-sm shadow-md hover:opacity-90 transition-all duration-200"
                    style={{
                      background:
                        "linear-gradient(to bottom, #5C43F6, #BC61F3)",
                    }}
                  >
                    View Details
                  </button>
                </motion.div>
              )
            )}
          </div>
        </section>

        {/* Circular Section */}
        <section className="py-20 px-6 md:px-16 bg-[#020106] text-white flex items-center justify-center">
          <motion.div
            {...fadeIn(0.2)}
            className="flex flex-col md:flex-row items-center justify-center gap-20 max-w-6xl"
          >
            {/* Left Circle Image */}
            <div className="flex-1 flex justify-center">
              <img
                src="./orbit.png"
                alt="Skill Orbit"
                className="rounded-full w-85 h-85 md:w-85 md:h-85 object-cover shadow-[0_0_40px_-10px_#BC61F3]"
              />
            </div>

            {/* Right Content */}
            <div className="flex-1 text-center md:text-left max-w-xl">
              <h3 className="text-3xl md:text-5xl font-extrabold leading-snug mb-6 bg-gradient-to-r from-[#5C43F6] via-[#BC61F3] to-white text-transparent bg-clip-text">
                Empower Your Learning Journey, <br />
                Track Progress, <br />
                Earn Badges, <br />
                Showcase Skills.
              </h3>

              <p className="text-[#9CA9AE] text-base md:text-lg mb-8">
                Join thousands of learners already building verified portfolios.
                Track your growth, earn credibility, and get noticed by top
                companies.
              </p>

              {/* Inline Subscribe Form */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="relative w-full"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#151c27ff] border border-[#485363] rounded-lg px-5 pr-32 py-5 text-sm text-white placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#BC61F3]"
                />
                <button
                  type="submit"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 px-5 py-2.5 rounded-lg font-medium text-white text-sm shadow-md hover:opacity-90 transition-all duration-200"
                  style={{
                    background: "linear-gradient(to bottom, #5C43F6, #BC61F3)",
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </section>

        {/* BadgeUp, SkillUp Section */}
        <section className="py-20 px-6 md:px-16 bg-[#020106] text-white text-center">
          <motion.h2
            {...fadeIn(0.2)}
            className="text-3xl font-bold mb-16 text-white bg-clip-text"
          >
            <span className="text-[#FDD835]">Badge</span> Up.{" "}
            <span className="text-[#FDD835]">Skill</span> Up.
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
            {[
              {
                img: "./b4.png",
                title: "Earn Verified Badges",
                desc: "Showcase your verified achievements to employers.",
              },
              {
                img: "./b2.png",
                title: "Track Your Progress",
                desc: "Monitor every milestone in your learning journey.",
              },
              {
                img: "./b3.png",
                title: "Level Up Skills",
                desc: "Upskill through guided projects and real tasks.",
              },
              {
                img: "./b4.png",
                title: "Get Recognized",
                desc: "Gain credibility and boost your professional profile.",
              },
            ].map((item, i) => (
              <motion.div
                {...fadeIn(i * 0.1 + 0.3)}
                key={item.title}
                className="bg-[#141221] border border-[#1E1B2E] rounded-full py-8 px-8 flex flex-col items-center justify-start text-center hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_-10px_rgba(92,67,246,0.3)] h-[380px]"
              >
                {/* Circle Image */}
                <div className="w-45 h-45 md:w-45 md:h-45 rounded-full overflow-hidden mb-6">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Heading */}
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

                {/* Description */}
                <p className="text-[#9CA9AE] text-sm max-w-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 text-center px-6 bg-[#0C081A]">
          <motion.h2
            {...fadeIn(0.2)}
            className="text-3xl font-bold mb-6 leading-snug"
          >
            Simple, <span className="text-[#FDCB58]">straightforward</span>{" "}
            pricing
          </motion.h2>

          <div className="flex flex-col md:flex-row justify-center gap-8">
            {/* Free Plan */}
            <motion.div
              {...fadeIn(0.3)}
              className="relative w-80 p-[2px] rounded-2xl transition-all duration-300 hover:scale-105"
              style={{
                background:
                  "linear-gradient(145deg, rgba(92,67,246,0.9), rgba(188,97,243,0.9))",
              }}
            >
              <div className="bg-[#1E1B2E] rounded-2xl p-8 h-full shadow-[0_0_25px_-5px_rgba(188,97,243,0.4)]">
                <h3 className="text-xl font-semibold mb-2">Lil Hustler 😎</h3>
                <p className="text-[#9CA9AE] mb-4">
                  Free plan to get you started
                </p>
                <ul className="text-left text-sm space-y-2 mb-6">
                  <li>✅ Access to free gigs</li>
                  <li>✅ Basic skillpacks</li>
                  <li>✅ Community support</li>
                </ul>
                <button
                  className="px-6 py-2 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "linear-gradient(to bottom, #5C43F6, #BC61F3)",
                  }}
                >
                  Get Started
                </button>
              </div>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              {...fadeIn(0.5)}
              className="relative w-80 p-[2px] rounded-2xl transition-all duration-300 hover:scale-105"
              style={{
                background:
                  "linear-gradient(145deg, rgba(188,97,243,0.9), rgba(92,67,246,0.9))",
              }}
            >
              <div className="bg-[#1E1B2E] rounded-2xl p-8 h-full shadow-[0_0_25px_-5px_rgba(92,67,246,0.4)]">
                <h3 className="text-xl font-semibold mb-2">
                  Hustler’s Club 💼
                </h3>
                <p className="text-[#9CA9AE] mb-4">
                  Premium plan for serious earners
                </p>
                <ul className="text-left text-sm space-y-2 mb-6">
                  <li>💎 Access to paid gigs</li>
                  <li>💎 Verified badges</li>
                  <li>💎 Personalized mentorship</li>
                </ul>
                <button
                  className="px-6 py-2 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "linear-gradient(to bottom, #5C43F6, #BC61F3)",
                  }}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Features Section */}
        <section className="py-20 px-6 md:px-16 bg-[#020106] text-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-center sm:text-left">
            {/* Heading + Paragraph (not a card) */}
            <motion.div
              {...fadeIn(0.2)}
              className="flex flex-col justify-center items-center sm:items-start p-2"
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-b from-[#5C43F6] via-[#BC61F3] to-[#BC61F3] text-transparent bg-clip-text">
                Our Features
              </h2>
              <p className="text-[#9CA9AE] text-sm max-w-sm leading-relaxed">
                Explore the core highlights that make Hustlee the ultimate
                platform for learners, mentors, and earners. Every feature is
                built to help you grow smarter and faster.
              </p>
            </motion.div>

            {/* Feature Cards */}
            {[
              {
                logo: "🎯",
                title: "Goal-Based Learning",
                desc: "Set learning goals, track progress, and earn verified badges.",
              },
              {
                logo: "🧠",
                title: "AI Skill Assessment",
                desc: "Smart AI-driven analysis to measure and improve your skills.",
              },
              {
                logo: "👨‍🏫",
                title: "Expert Mentorship",
                desc: "Learn directly from experienced mentors and industry experts.",
              },
              {
                logo: "💰",
                title: "Paid Gigs",
                desc: "Get real-world experience and earn while you learn.",
              },
              {
                logo: "🏆",
                title: "Achievements & Rewards",
                desc: "Earn recognition, level up, and showcase your verified profile.",
              },
            ].map((feature, i) => (
              <motion.div
                {...fadeIn(i * 0.1 + 0.3)}
                key={feature.title}
                className="bg-[#141221] rounded-xl p-8 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300 shadow-[0_0_25px_-10px_rgba(92,67,246,0.3)] border border-[#1E1B2E]"
              >
                <div className="text-4xl mb-4">{feature.logo}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-[#9CA9AE] text-sm max-w-xs leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-6 md:px-16 bg-[#020106] text-white">
          <motion.div
            {...fadeIn(0.2)}
            className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto"
          >
            {/* Left Image */}
            <motion.div {...fadeIn(0.3)} className="flex-1 flex justify-center">
              <img
                src="./contact.png"
                alt="Contact Illustration"
                className="rounded-xl shadow-[0_0_40px_-10px_#5C43F6] w-full max-w-md object-cover"
              />
            </motion.div>

            {/* Right Contact Form */}
            <motion.div
              {...fadeIn(0.4)}
              className="flex-1 text-center md:text-left"
            >
              <h2 className="text-3xl font-bold mb-6">Contact Us Now</h2>
              <p className="text-[#9CA9AE] mb-8 max-w-md mx-auto md:mx-0">
                Have questions or want to collaborate? Reach out and let’s
                connect!
              </p>

              <form className="space-y-4 text-left max-w-md mx-auto md:mx-0">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-[#1E2939] border border-[#485363] rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#BC61F3]"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-[#1E2939] border border-[#485363] rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#BC61F3]"
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full bg-[#1E2939] border border-[#485363] rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#BC61F3]"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-3 rounded-md text-white font-semibold shadow-md hover:opacity-90 transition-all duration-200"
                  style={{
                    background: "linear-gradient(to bottom, #5C43F6, #BC61F3)",
                  }}
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Home;
