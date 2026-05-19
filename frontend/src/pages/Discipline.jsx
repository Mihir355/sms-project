import { useEffect, useState } from "react";
import API from "../services/api";

const Discipline = () => {
  const [students, setStudents] = useState([]);

  const [enrollments, setEnrollments] = useState([]);

  const [selectedEnrollment, setSelectedEnrollment] = useState("");

  const [records, setRecords] = useState([]);

  const [formData, setFormData] = useState({
    issue: "",
    actionTaken: "",
    incidentDate: "",
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

  const fetchRecords = async (enrollmentId) => {
    try {
      const response = await API.get(
        `/disciplinary-records/enrollment/${enrollmentId}`,
      );

      setRecords(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStudentChange = async (e) => {
    const studentId = e.target.value;

    setSelectedEnrollment("");

    setRecords([]);

    if (studentId) {
      fetchEnrollments(studentId);
    }
  };

  const handleEnrollmentChange = (e) => {
    const enrollmentId = e.target.value;

    setSelectedEnrollment(enrollmentId);

    if (enrollmentId) {
      fetchRecords(enrollmentId);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/disciplinary-records/${selectedEnrollment}`, formData);

      fetchRecords(selectedEnrollment);

      setFormData({
        issue: "",
        actionTaken: "",
        incidentDate: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Disciplinary Records</h1>

      <div className="bg-white p-6 rounded shadow mb-6">
        <select
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

        <select
          value={selectedEnrollment}
          onChange={handleEnrollmentChange}
          className="border p-3 rounded w-full mb-4"
        >
          <option value="">Select Course</option>

          {enrollments.map((enrollment) => (
            <option key={enrollment.id} value={enrollment.id}>
              {enrollment.course}
            </option>
          ))}
        </select>

        {selectedEnrollment && (
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="issue"
              placeholder="Issue"
              value={formData.issue}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="text"
              name="actionTaken"
              placeholder="Action Taken"
              value={formData.actionTaken}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="date"
              name="incidentDate"
              value={formData.incidentDate}
              onChange={handleChange}
              className="border p-3 rounded col-span-2"
              required
            />

            <button
              type="submit"
              className="bg-red-600 text-white py-3 rounded col-span-2"
            >
              Add Record
            </button>
          </form>
        )}
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Disciplinary History</h2>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Issue</th>

              <th className="p-3 text-left">Action Taken</th>

              <th className="p-3 text-left">Incident Date</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-b">
                <td className="p-3">{record.issue}</td>

                <td className="p-3">{record.actionTaken}</td>

                <td className="p-3">{record.incidentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Discipline;
