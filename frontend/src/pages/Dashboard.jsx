import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    attendance: 0,
    academics: 0,
    discipline: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [students, attendance, academics, discipline] = await Promise.all([
        API.get("/students"),
        API.get("/attendance"),
        API.get("/academic-records"),
        API.get("/disciplinary-records"),
      ]);

      setStats({
        students: students.data.length,
        attendance: attendance.data.length,
        academics: academics.data.length,
        discipline: discipline.data.length,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Student Management Dashboard</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-semibold mb-2">Welcome Admin</h2>

        <p className="text-gray-600">
          Manage students, attendance, academics, and disciplinary records from
          one centralized portal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500 mb-2">Total Students</p>

          <h2 className="text-5xl font-bold text-blue-600">{stats.students}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500 mb-2">Attendance Records</p>

          <h2 className="text-5xl font-bold text-green-600">
            {stats.attendance}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500 mb-2">Academic Records</p>

          <h2 className="text-5xl font-bold text-yellow-500">
            {stats.academics}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500 mb-2">Discipline Cases</p>

          <h2 className="text-5xl font-bold text-red-500">
            {stats.discipline}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
