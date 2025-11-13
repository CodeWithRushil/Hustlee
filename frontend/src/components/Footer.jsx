import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#020106] text-white py-24 px-6 md:px-20 border-t border-[#1E1B2E]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-16">

        {/* Column 1 — Branding */}
        <div className="space-y-6">
          {/* Logo Image */}
          <img
            src="/HUSTLee.png"
            alt="HUSTLee Logo"
            className="h-10 w-auto"
          />

          <p className="text-[#BCBCBC] leading-relaxed text-lg max-w-sm">
            Hustlee helps you track goals, earn XP, and grow your skills—
            all in one gamified workspace.
          </p>
        </div>

        {/* Column 2 — Opportunities */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Opportunities</h3>
          <ul className="space-y-4 text-[#BCBCBC] text-lg">
            <li>Web Development</li>
            <li>Design Projects</li>
            <li>Marketing Tasks</li>
            <li>Freelance Gigs</li>
          </ul>
        </div>

        {/* Column 3 — Stats */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Stats</h3>
          <ul className="space-y-4 text-[#BCBCBC] text-lg">
            <li>XP Activity</li>
            <li>Task Analytics</li>
            <li>Rankings</li>
          </ul>
        </div>

        {/* Column 4 — Hustlee Team */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Hustlee Team</h3>
          <ul className="space-y-4 text-[#BCBCBC] text-lg">
            <li>About Hustlee</li>
            <li>Support Center</li>
            <li>Product Features</li>
            <li>Our Top Users</li>
          </ul>
        </div>

        {/* Column 5 — Guides */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Guides</h3>
          <ul className="space-y-4 text-[#BCBCBC] text-lg">
            <li>How it Works</li>
            <li>Hustlee Blog</li>
            <li>Affiliate Program</li>
            <li>Creator Hub</li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
