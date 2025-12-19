import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import Gigs from "./pages/Gigs";
import Mentorship from "./pages/Mentorship";
import Courses from "./pages/Courses";
import Portfolio from "./pages/Portfolio";
import SkillTest from "./pages/SkillTest";
import MentorDashboard from "./pages/MentorDashboard";
import StudentProgress from "./components/StudentProgress";
import MentorChat from "./pages/MentorChat";
import MentorSchedule from "./pages/MentorSchedule";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import PostGig from "./pages/PostGig";
import ManageGigs from "./pages/ManageGigs";

// Layout component to wrap protected routes with Navbar
const ProtectedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/post-gig" element={<PostGig />} />
      <Route path="/manage-gigs" element={<ManageGigs />} />

      {/* Protected Routes */}
      <Route element={<ProtectedLayout />}>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="gigs"
          element={
            <ProtectedRoute>
              <Gigs />
            </ProtectedRoute>
          }
        />
        <Route
          path="mentorship"
          element={
            <ProtectedRoute>
              <Mentorship />
            </ProtectedRoute>
          }
        />
        <Route
          path="courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="portfolio"
          element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          }
        />
        <Route
          path="skill-test"
          element={
            <ProtectedRoute>
              <SkillTest />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Mentor Routes */}
      <Route element={<ProtectedLayout />}>
        <Route
          path="mentor/dashboard"
          element={
            <ProtectedRoute>
              <MentorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="mentor/student/:studentId"
          element={
            <ProtectedRoute>
              <StudentProgress />
            </ProtectedRoute>
          }
        />
        <Route
          path="mentor/chat/:studentId"
          element={
            <ProtectedRoute>
              <MentorChat />
            </ProtectedRoute>
          }
        />
        <Route
          path="mentor/schedule/:studentId"
          element={
            <ProtectedRoute>
              <MentorSchedule />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
