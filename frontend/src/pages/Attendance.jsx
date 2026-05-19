import { useEffect, useState } from "react";
import API from "../services/api";

const Attendance = () => {
  const [students, setStudents] = useState([]);

  const [enrollments, setEnrollments] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState("");

  const [selectedEnrollment, setSelectedEnrollment] = useState("");

  const [attendanceList, setAttendanceList] = useState([]);

  const [attendanceData, setAttendanceData] = useState({
    date: "",
    status: "PRESENT",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await API.get("/students");

      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async (studentId) => {
    try {
      const response = await API.get(`/enrollments/student/${studentId}`);

      setEnrollments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAttendance = async (enrollmentId) => {
    try {
      const response = await API.get(`/attendance/enrollment/${enrollmentId}`);

      setAttendanceList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStudentChange = async (e) => {
    const studentId = e.target.value;

    setSelectedStudent(studentId);

    setSelectedEnrollment("");

    setAttendanceList([]);

    if (studentId) {
      await fetchEnrollments(studentId);
    }
  };

  const handleEnrollmentChange = async (e) => {
    const enrollmentId = e.target.value;

    setSelectedEnrollment(enrollmentId);

    if (enrollmentId) {
      await fetchAttendance(enrollmentId);
    }
  };

  const handleChange = (e) => {
    setAttendanceData({
      ...attendanceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/attendance/${selectedEnrollment}`, attendanceData);

      fetchAttendance(selectedEnrollment);

      setAttendanceData({
        date: "",
        status: "PRESENT",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Attendance Management</h1>

      <div className="bg-white p-6 rounded shadow mb-6">
        {/* Student Select */}
        <select
          value={selectedStudent}
          onChange={handleStudentChange}
          className="border p-3 rounded w-full mb-4"
        >
          <option value="">Select Student</option>

          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.firstName} {student.lastName}
            </option>
          ))}
        </select>

        {/* Enrollment Select */}
        {selectedStudent && (
          <select
            value={selectedEnrollment}
            onChange={handleEnrollmentChange}
            className="border p-3 rounded w-full mb-4"
          >
            <option value="">Select Course Enrollment</option>

            {enrollments.map((enrollment) => (
              <option key={enrollment.id} value={enrollment.id}>
                {enrollment.course} ({enrollment.admissionDate})
              </option>
            ))}
          </select>
        )}

        {/* Attendance Form */}
        {selectedEnrollment && (
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={attendanceData.date}
              onChange={handleChange}
              className="border p-3 rounded"
              max={new Date().toISOString().split("T")[0]}
              required
            />

            <select
              name="status"
              value={attendanceData.status}
              onChange={handleChange}
              className="border p-3 rounded"
            >
              <option value="PRESENT">PRESENT</option>

              <option value="ABSENT">ABSENT</option>
            </select>

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded col-span-2"
            >
              Mark Attendance
            </button>
          </form>
        )}
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Attendance Records</h2>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Date</th>

              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {attendanceList.map((attendance) => (
              <tr key={attendance.id} className="border-b">
                <td className="p-3">{attendance.date}</td>

                <td className="p-3">{attendance.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
