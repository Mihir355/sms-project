import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Academics from "./pages/Academics";
import Discipline from "./pages/Discipline";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex bg-gray-100 min-h-screen">
                <Sidebar />

                <div className="ml-64 flex-1">
                  <Navbar />

                  <div className="p-6">
                    <Routes>
                      <Route path="/home" element={<Dashboard />} />

                      <Route path="/students" element={<Students />} />

                      <Route path="/attendance" element={<Attendance />} />

                      <Route path="/academics" element={<Academics />} />

                      <Route path="/discipline" element={<Discipline />} />
                    </Routes>
                    <footer className="mt-10 text-center text-gray-500">
                      Student Management System © 2026
                    </footer>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
