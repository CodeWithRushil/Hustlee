import React from "react";
import {
  Home,
  LayoutDashboard,
  Users,
  Briefcase,
  MessageSquare,
  BarChart,
  User,
  Search,
  Bell,
  Plus,
  MoreVertical,
  Users as ApplicantsIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const ManageGigs = () => {
  const filters = ["All", "Active", "Paused", "Draft", "Closed"];

  const stats = [
    { label: "Total Gigs", value: 6 },
    { label: "Active", value: 3, color: "text-green-400" },
    { label: "Paused", value: 1, color: "text-yellow-400" },
    { label: "Total Applicants", value: 115, color: "text-purple-400" },
  ];

  const gigs = [
    {
      title: "Full Stack Developer",
      category: "Technology",
      applicants: 24,
      status: "Active",
      posted: "2024-10-15",
      deadline: "2024-11-15",
      pay: "$5000",
    },
    {
      title: "UI/UX Designer",
      category: "Design",
      applicants: 18,
      status: "Active",
      posted: "2024-10-20",
      deadline: "2024-11-20",
      pay: "$3500",
    },
    {
      title: "Mobile App Developer",
      category: "Technology",
      applicants: 31,
      status: "Paused",
      posted: "2024-10-10",
      deadline: "2024-11-10",
      pay: "$6000",
    },
    {
      title: "Content Writer",
      category: "Content Writing",
      applicants: 12,
      status: "Active",
      posted: "2024-10-25",
      deadline: "2024-11-25",
      pay: "$2000",
    },
    {
      title: "Data Scientist",
      category: "Data Science",
      applicants: 8,
      status: "Draft",
      posted: "2024-10-26",
      deadline: "2024-11-26",
      pay: "$7000",
    },
    {
      title: "Social Media Manager",
      category: "Marketing",
      applicants: 22,
      status: "Closed",
      posted: "2024-09-15",
      deadline: "2024-10-15",
      pay: "$3000",
    },
  ];

  const statusStyle = {
    Active: "bg-green-500/20 text-green-400",
    Paused: "bg-yellow-500/20 text-yellow-400",
    Draft: "bg-gray-500/20 text-gray-400",
    Closed: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="min-h-screen flex bg-[#020106] text-white">
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

        <nav className="space-y-4 text-md text-[#9CA9AE]">
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
              className="flex items-center gap-3 hover:text-white cursor-pointer transition"
            >
              <Icon size={16} />
              {label}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 px-10 py-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-72">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              placeholder="Search..."
              className="w-full bg-[#0C1022] border border-[#1E1B2E] pl-10 pr-4 py-2 rounded-md text-sm text-white placeholder-[#9CA9AE] focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <button className="flex items-center gap-2 bg-[#0C1022] border border-[#1E1B2E] px-4 py-2 rounded-md text-sm">
            <Bell size={14} />
            Announcements
          </button>
        </div>

        {/* Banner */}
        <div
          className="rounded-2xl p-8 mb-8"
          style={{
            backgroundImage: `
              url('/banner.jpg')
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-2xl font-semibold">Manage Gigs</h1>
          <p className="text-sm text-gray-300 mt-1">
            View and control all your posted gigs
          </p>
        </div>

        {/* Search + Filters */}
        <div className="bg-[#0C1022] border border-[#1E1B2E] rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <input
              placeholder="Search gigs by title or category..."
              className="w-1/2 bg-[#070A18] border border-[#1E1B2E] px-4 py-2 rounded-md text-sm"
            />
            <Link to="/">
              <button
                className="flex gap-2 items-center w-34 px-3 py-2 rounded-md text-white font-medium text-sm shadow-md hover:opacity-90 transition-all duration-200"
                style={{
                  background: "linear-gradient(to bottom, #5C43F6, #BC61F3)",
                }}
              >
                <Plus size={16} /> Post New Gig
              </button>
            </Link>
          </div>

          <div className="flex gap-3">
            {filters.map((f, i) => (
              <span
                key={f}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                  i === 0
                    ? "bg-purple-600 text-white"
                    : "bg-purple-600/20 text-purple-300"
                }`}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#0C1022] border border-[#1E1B2E] rounded-xl p-6"
            >
              <p className="text-[#9CA9AE] text-sm">{s.label}</p>
              <h3 className={`text-2xl font-semibold mt-1 ${s.color || ""}`}>
                {s.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#0C1022] border border-[#1E1B2E] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#070A18] text-[#9CA9AE]">
              <tr>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Applicants</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Posted On</th>
                <th className="px-6 py-4 text-left">Deadline</th>
                <th className="px-6 py-4 text-left">Pay</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {gigs.map((gig, i) => (
                <tr
                  key={i}
                  className="border-t border-[#1E1B2E] hover:bg-[#070A18]"
                >
                  <td className="px-6 py-4">{gig.title}</td>
                  <td className="px-6 py-4 text-[#9CA9AE]">{gig.category}</td>
                  <td className="px-6 py-4 flex items-center gap-2 text-purple-400">
                    <ApplicantsIcon size={16} /> {gig.applicants}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        statusStyle[gig.status]
                      }`}
                    >
                      {gig.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#9CA9AE]">{gig.posted}</td>
                  <td className="px-6 py-4 text-[#9CA9AE]">{gig.deadline}</td>
                  <td className="px-6 py-4 text-green-400">{gig.pay}</td>
                  <td className="px-6 py-4">
                    <MoreVertical size={16} className="cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ManageGigs;
