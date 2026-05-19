import { useEffect, useState } from "react";
import API from "../services/api";
import StudentTable from "../components/StudentTable";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Students = () => {
  const [students, setStudents] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [enrollmentData, setEnrollmentData] = useState({
    course: "",
    admissionDate: "",
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEnrollmentChange = (e) => {
    setEnrollmentData({
      ...enrollmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/students/${editingId}`, formData);

        toast.success("Student updated successfully");

        setEditingId(null);
      } else {
        const studentResponse = await API.post("/students", formData);

        const studentId = studentResponse.data.id;

        await API.post(`/enrollments/${studentId}`, enrollmentData);

        toast.success("Student added successfully");
      }

      fetchStudents();

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });

      setEnrollmentData({
        course: "",
        admissionDate: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");

      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This student and related records will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await API.delete(`/students/${id}`);

      toast.success("Student deleted");

      fetchStudents();
    } catch (error) {
      toast.error("Delete failed");

      console.error(error);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student.id);

    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone,
    });
  };

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Students Management</h1>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-3 rounded w-full mb-6"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-8 grid grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        {!editingId && (
          <>
            <input
              type="text"
              name="course"
              placeholder="Course"
              value={enrollmentData.course}
              onChange={handleEnrollmentChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="date"
              name="admissionDate"
              value={enrollmentData.admissionDate}
              onChange={handleEnrollmentChange}
              className="border p-3 rounded"
              required
            />
          </>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded col-span-2"
        >
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </form>

      <StudentTable
        students={filteredStudents}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default Students;
