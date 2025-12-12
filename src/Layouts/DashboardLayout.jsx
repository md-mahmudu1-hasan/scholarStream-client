import { useState } from "react";
import { FiMenu, FiX, FiHome, FiUser, FiLogOut, FiBell } from "react-icons/fi";
import { Outlet, Link, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { IoIosAddCircle } from "react-icons/io";
import { MdManageHistory } from "react-icons/md";
import { FaRegNewspaper, FaUsers } from "react-icons/fa";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { SignOut } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    SignOut().then(() => {
      navigate("/");
      toast.success("Logout successfully");
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* ----------Navbar ---------- */}
      <header className="w-full bg-white shadow-sm flex items-center justify-between px-4 py-3 fixed top-0 left-0 z-20 md:pl-72">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 bg-gray-100 rounded"
          >
            <FiMenu size={20} />
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded hover:bg-gray-100">
            <FiBell size={20} />
          </button>
          <button className="p-2 rounded hover:bg-gray-100">
            <FiUser size={20} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* ---------- Desktop Sidebar ---------- */}
        <aside className="hidden md:flex md:flex-col md:w-64 bg-white shadow-md fixed left-0 top-0 bottom-0 pt-16">
          <nav className="p-4 flex-1">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
                >
                  <FiHome /> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-profile"
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
                >
                  <FiUser /> Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/add-scolership"
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
                >
                  <IoIosAddCircle /> Add Scholarship
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/manage-scolership"
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
                >
                  <MdManageHistory /> Manage Scholarship
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/manage-users"
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
                >
                  <FaUsers /> Manage Users
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/manage-applications"
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
                >
                  <FaRegNewspaper /> Manage Applications
                </Link>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full p-2 rounded hover:bg-gray-100"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </aside>
        {open && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setOpen(false)}
          ></div>
        )}
        <div
          className={`fixed top-0 left-0 h-full w-56 bg-white shadow-lg z-40 transform md:hidden transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          } pt-16`}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <FiX />
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
                >
                  <FiHome /> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
                >
                  <FiUser /> Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/add-scolership"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
                >
                  <IoIosAddCircle /> Add Scholarship
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/manage-scolership"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
                >
                  <MdManageHistory /> Manage Scholarship
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/manage-users"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
                >
                  <FaUsers /> Manage Users
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setOpen(false)}
                  to="/dashboard/manage-applications"
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
                >
                  <FaRegNewspaper /> Manage Applications
                </Link>
              </li>
            </ul>
          </nav>
          <div className="p-4 border-t absolute bottom-0 w-full">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full p-2 rounded hover:bg-gray-100"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        {/* ---------- Main Content ---------- */}
        <main className="flex-1 md:ml-64 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
