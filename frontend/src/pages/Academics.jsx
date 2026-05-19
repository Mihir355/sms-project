import { useEffect, useState } from "react";
import API from "../services/api";

const Academics = () => {
  const [students, setStudents] = useState([]);

  const [enrollments, setEnrollments] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState("");

  const [selectedEnrollment, setSelectedEnrollment] = useState("");

  const [records, setRecords] = useState([]);

  const [formData, setFormData] = useState({
    marks: "",
    grade: "",
    semester: "",
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
        `/academic-records/enrollment/${enrollmentId}`,
      );

      setRecords(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStudentChange = async (e) => {
    const studentId = e.target.value;

    setSelectedStudent(studentId);

    setSelectedEnrollment("");

    setRecords([]);

    if (studentId) {
      await fetchEnrollments(studentId);
    }
  };

  const handleEnrollmentChange = async (e) => {
    const enrollmentId = e.target.value;

    setSelectedEnrollment(enrollmentId);

    if (enrollmentId) {
      await fetchRecords(enrollmentId);
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
      await API.post(`/academic-records/${selectedEnrollment}`, formData);

      fetchRecords(selectedEnrollment);

      setFormData({
        marks: "",
        grade: "",
        semester: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Academic Records</h1>

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

        {/* Form */}
        {selectedEnrollment && (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="number"
              name="marks"
              placeholder="Marks"
              value={formData.marks}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="text"
              name="grade"
              placeholder="Grade"
              value={formData.grade}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="number"
              name="semester"
              placeholder="Semester"
              value={formData.semester}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded col-span-2"
            >
              Add Academic Record
            </button>
          </form>
        )}
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Academic Records List</h2>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Marks</th>

              <th className="p-3 text-left">Grade</th>

              <th className="p-3 text-left">Semester</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-b">
                <td className="p-3">{record.marks}</td>

                <td className="p-3">{record.grade}</td>

                <td className="p-3">{record.semester}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Academics;
