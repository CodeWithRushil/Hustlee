import React from "react";
import {
  Home,
  LayoutDashboard,
  Users,
  Briefcase,
  MessageSquare,
  BarChart,
  User,
  Bell,
  Search,
  FileText,
  Tag,
  Calendar,
  DollarSign,
  Bolt,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

const PostGig = () => {
  return (
    <div className="min-h-screen bg-[#020106] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#050813] border-r border-[#1E1B2E] px-6 py-6">
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

        <hr className="my-6 border-[#1E1B2E]" />

        <nav className="space-y-4 text-md">
          {[
            { label: "Home", icon: Home },
            { label: "Dashboard", icon: LayoutDashboard },
            { label: "Find Talents", icon: Users },
            { label: "My Gigs", icon: Briefcase },
            { label: "Messages", icon: MessageSquare },
            { label: "Analytics", icon: BarChart },
            { label: "Profile", icon: User },
          ].map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 text-[#9CA9AE] hover:text-white cursor-pointer"
            >
              <Icon size={16} />
              {label}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 px-10 py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-72">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA9AE]"
            />
            <input
              placeholder="Search..."
              className="w-full bg-[#0C1022] border border-[#1E1B2E] pl-10 pr-4 py-2 rounded-md text-sm text-white placeholder-[#9CA9AE] focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <button className="flex items-center gap-2 bg-[#0C1022] px-4 py-2 rounded-md text-sm border border-[#1E1B2E]">
            <Bell size={14} />
            Announcements
          </button>
        </div>

        {/* Banner */}
        <div
          className="relative rounded-2xl p-8 mb-8 overflow-hidden"
          style={{
            backgroundImage: `
        url('/banner.jpg')
      `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-2xl font-semibold relative z-10">
            Talent Discovery
          </h1>
          <p className="text-sm text-purple-200 mt-1 relative z-10">
            View and control all your posted gigs
          </p>
        </div>

        {/* Form Card */}
        <div className="mx-auto bg-gradient-to-b from-[#0E1024] to-[#080A18] border border-[#1E1B2E] rounded-2xl p-10 max-w-5xl">
          <div className="space-y-6">
            {/* Gig Title */}
            <div>
              <label className="text-sm text-white flex gap-2 items-center">
                <Briefcase size={16} /> Gig Title
              </label>
              <input
                placeholder="e.g. Full Stack Developer for E-commerce Platform"
                className="w-full mt-2 bg-[#020106] border border-[#1E1B2E] rounded-md px-4 py-2 text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-white flex gap-2 items-center">
                <FileText size={16} /> Description
              </label>
              <textarea
                rows={4}
                placeholder="Describe the project, requirements, and expectations..."
                className="w-full mt-2 bg-[#020106] border border-[#1E1B2E] rounded-md px-4 py-2 text-sm resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm text-white flex gap-2 items-center">
                <Tag size={16} /> Category
              </label>
              <select className="w-full mt-2 bg-[#020106] border border-[#1E1B2E] rounded-md px-4 py-2 text-sm">
                <option>Select category</option>
                <option>Web Development</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
            </div>

            {/* Duration / Deadline / Pay */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-white flex gap-2 items-center">
                  <Calendar size={16} /> Duration
                </label>
                <select className="w-full mt-2 bg-[#020106] border border-[#1E1B2E] rounded-md px-4 py-2 text-sm">
                  <option>Select</option>
                  <option>1 Week</option>
                  <option>2 Weeks</option>
                  <option>1 Month</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-white flex gap-2 items-center">
                  <Calendar size={16} /> Deadline
                </label>
                <input
                  type="date"
                  className="w-full mt-2 bg-[#020106] border border-[#1E1B2E] rounded-md px-4 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-white flex gap-2 items-center">
                  <DollarSign size={16} /> Pay / Stipend
                </label>
                <input
                  placeholder="₹5000"
                  className="w-full mt-2 bg-[#020106] border border-[#1E1B2E] rounded-md px-4 py-2 text-sm"
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="text-sm text-white flex gap-2 items-center">
                <Bolt size={16} /> Skills Required
              </label>
              <input
                placeholder="Add skills..."
                className="w-full mt-2 bg-[#020106] border border-[#1E1B2E] rounded-md px-4 py-2 text-sm"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-8">
              <Link to="/">
                <button
                  className="flex gap-2 items-center w-34 px-6 py-2 rounded-md text-white font-medium text-sm shadow-md hover:opacity-90 transition-all duration-200"
                  style={{
                    background: "linear-gradient(to bottom, #5C43F6, #BC61F3)",
                  }}
                >
                  <Eye size={20} /> Preview Gig
                </button>
              </Link>

              <button className="w-32 px-6 py-2 rounded-md bg-white text-black text-sm font-medium">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostGig;
