const StudentTable = ({ students, handleDelete, handleEdit }) => {
  return (
    <div className="bg-white shadow rounded p-5">
      <table className="w-full border-collapse overflow-hidden rounded-xl">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3 text-left">Student ID</th>

            <th className="p-3 text-left">First Name</th>

            <th className="p-3 text-left">Last Name</th>

            <th className="p-3 text-left">Email</th>

            <th className="p-3 text-left">Phone</th>

            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-6 text-gray-500">
                No students found
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr
                key={student.id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3">{student.studentCode}</td>

                <td className="p-3">{student.firstName}</td>

                <td className="p-3">{student.lastName}</td>

                <td className="p-3">{student.email}</td>

                <td className="p-3">{student.phone}</td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
