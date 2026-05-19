import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    {
      name: "Dashboard",
      path: "/home",
    },
    {
      name: "Students",
      path: "/students",
    },
    {
      name: "Attendance",
      path: "/attendance",
    },
    {
      name: "Academics",
      path: "/academics",
    },
    {
      name: "Discipline",
      path: "/discipline",
    },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 p-6">
      <h1 className="text-3xl font-bold mb-10">SMS Portal</h1>

      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`p-3 rounded transition ${
              location.pathname === link.path
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
