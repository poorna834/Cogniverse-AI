import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import Admin from "./Pages/Admin";
import ManageCourses from "./Pages/ManageCourses";
import EditCourse from "./Pages/EditCourse";
import Bookmarks from "./Pages/Bookmarks";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import Roadmaps from "./Pages/Roadmaps";
import AIMentor from "./Pages/AIMentor";
import Certificates from "./Pages/Certificates";
import CertificateView from "./Pages/CertificateView";
import VerifyCertificate from "./Pages/VerifyCertificate";
import Leaderboard from "./Pages/Leaderboard";
import Achievements from "./Pages/Achievements";
import Notifications from "./Pages/Notifications";
import AdminDashboard from "./Pages/AdminDashboard";
import PixiLand from "./Pages/PixiLand";
import AddRoadmap from "./Pages/AddRoadmap";
import ManageRoadmaps from "./Pages/ManageRoadmaps";
import RoadmapDetails from "./Pages/RoadmapDetails";
import StudyPlanner from "./Pages/StudyPlanner";
import NotesHub from "./Pages/NotesHub";
import NoteEditor from "./Pages/NoteEditor";
import AddKnowledge from "./Pages/AddKnowledge";
import ManageKnowledge from "./Pages/ManageKnowledge";
import EditKnowledge from "./Pages/EditKnowledge";
import LearningCenter from "./pages/LearningCenter";
import KnowledgeHub from "./pages/KnowledgeHub";
import KnowledgeDetails from "./Pages/KnowledgeDetails";
import LearningAnalytics from "./Pages/LearningAnalytics";
import CareerRoadmap from "./Pages/CareerRoadmap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/courses" element={<Courses />} />

        <Route path="/courses/:id" element={<CourseDetails />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute>
              <ManageCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/courses/edit/:id"
          element={
            <ProtectedRoute>
              <EditCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/roadmaps"
          element={
            <ProtectedRoute>
              <Roadmaps />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-mentor"
          element={
            <ProtectedRoute>
              <AIMentor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/certificates"
          element={
            <ProtectedRoute>
              <Certificates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/certificates/:id"
          element={
            <ProtectedRoute>
              <CertificateView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/verify/:id"
          element={<VerifyCertificate />}
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/achievements"
          element={
            <ProtectedRoute>
              <Achievements />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pixiland"
          element={
            <ProtectedRoute>
              <PixiLand />
            </ProtectedRoute>
          }
        />

        <Route
          path="/roadmaps/add"
          element={
            <ProtectedRoute>
              <AddRoadmap />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/roadmaps/add"
          element={
            <ProtectedRoute>
              <AddRoadmap />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/roadmaps"
          element={
            <ProtectedRoute>
              <ManageRoadmaps />
            </ProtectedRoute>
          }
        />

        <Route
          path="/roadmaps/:id"
          element={
            <ProtectedRoute>
              <RoadmapDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/study-planner"
          element={
            <ProtectedRoute>
              <StudyPlanner />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesHub />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes/new"
          element={
            <ProtectedRoute>
              <NoteEditor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes/:id"
          element={
            <ProtectedRoute>
              <NoteEditor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/knowledge/add"
          element={
            <ProtectedRoute>
              <AddKnowledge />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/knowledge"
          element={
            <ProtectedRoute>
              <ManageKnowledge />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/knowledge/edit/:id"
          element={
            <ProtectedRoute>
              <EditKnowledge />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learning-center"
          element={
            <ProtectedRoute>
              <LearningCenter />
            </ProtectedRoute>
          }
        />

        <Route
          path="/knowledge"
          element={
            <ProtectedRoute>
              <KnowledgeHub />
            </ProtectedRoute>
          }
        />

        <Route
          path="/knowledge/:id"
          element={
            <ProtectedRoute>
              <KnowledgeDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <LearningAnalytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/career-roadmap"
          element={<CareerRoadmap />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;