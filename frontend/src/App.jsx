import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PublicCourseDetailsPage from "./pages/PublicCourseDetailsPage";

import MyEnrollmentsPage from "./pages/student/MyEnrollmentsPage";
import WishlistPage from "./pages/student/WishlistPage";

import InstructorDashboardPage from "./pages/instructor/InstructorDashboardPage";
import InstructorCoursesPage from "./pages/instructor/InstructorCoursesPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

import CreateCoursePage from "./pages/instructor/CreateCoursePage";
import EditCoursePage from "./pages/instructor/EditCoursePage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/courses/:courseId"
          element={<PublicCourseDetailsPage />}
        />

        <Route
          path="/my-learning"
          element={
            <ProtectedRoute>
              <RoleRoute role="student">
                <MyEnrollmentsPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <RoleRoute role="student">
                <WishlistPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute role="instructor">
                <InstructorDashboardPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/courses"
          element={
            <ProtectedRoute>
              <RoleRoute role="instructor">
                <InstructorCoursesPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/create-course"
          element={
            <ProtectedRoute>
              <RoleRoute role="instructor">
                <CreateCoursePage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/course/:courseId"
          element={
            <ProtectedRoute>
              <RoleRoute role="instructor">
                <EditCoursePage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
