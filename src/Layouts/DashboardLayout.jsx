import { useState } from "react";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import { Outlet, Link, NavLink, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { IoIosAddCircle, IoMdAnalytics } from "react-icons/io";
import { MdManageHistory, MdOutlineReviews, MdReviews } from "react-icons/md";
import { FaRegNewspaper, FaUsers } from "react-icons/fa";
import { IoArrowBackCircleOutline, IoNewspaperOutline } from "react-icons/io5";
import useRole from "../Hooks/useRole";
import Loader from "../Pages/Loader/Loader";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { SignOut, loading } = useAuth();
  const { data, isLoading } = useRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    SignOut().then(() => {
      navigate("/");
      toast.success("Logout successfully");
    });
  };

  if (isLoading || loading) return <Loader />;

  // Enhanced sidebar link class for blue theme with dark mode support
  const sidebarLinkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg font-semibold"
        : "hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-800 dark:text-gray-200 hover:shadow-md"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <title>Dashboard</title>
      <header className="fixed top-0 left-0 right-0 h-[68px] bg-linear-to-r from-blue-600 to-blue-700 dark:from-gray-900 dark:to-gray-800 shadow-xl z-40 flex items-center justify-between px-4 md:pl-64">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
          >
            <FiMenu size={22} className="text-white" />
          </button>

          {/* Back to Home */}
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/20 transition"
          >
            <IoArrowBackCircleOutline size={22} className="text-white" />
            <span className="text-white font-medium">Back to home</span>
          </Link>
        </div>

        {/* Center Logo */}
        <img
          src="https://i.ibb.co/wNw5Qvvm/short.png"
          alt="Logo"
          className="h-9 object-contain"
        />
      </header>

      <div className="flex flex-1 pt-[68px]">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:flex-col md:w-64 bg-white dark:bg-gray-900 shadow-xl fixed top-0 left-0 bottom-0 pt-[68px] border-r border-gray-200 dark:border-gray-700">
          <nav className="flex-1 p-4 overflow-y-auto">
            <h3 className="text-xs text-gray-400 dark:text-gray-500 uppercase font-semibold mb-3 tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/dashboard/my-profile"
                  className={sidebarLinkClass}
                >
                  <FiUser /> Profile
                </NavLink>
              </li>

              {/* Admin Links */}
              {data?.role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/add-scolership"
                      className={sidebarLinkClass}
                    >
                      <IoIosAddCircle /> Add Scholarship
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manage-scolership"
                      className={sidebarLinkClass}
                    >
                      <MdManageHistory /> Manage Scholarship
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manage-users"
                      className={sidebarLinkClass}
                    >
                      <FaUsers /> Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/analytics"
                      className={sidebarLinkClass}
                    >
                      <IoMdAnalytics /> Analytics
                    </NavLink>
                  </li>
                </>
              )}

              {/* Moderator Links */}
              {data?.role === "moderator" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/manage-applications"
                      className={sidebarLinkClass}
                    >
                      <FaRegNewspaper /> Manage Applications
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/all-reviews"
                      className={sidebarLinkClass}
                    >
                      <MdReviews /> All Reviews
                    </NavLink>
                  </li>
                </>
              )}

              {/* Student Links */}
              {data?.role === "student" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/my-applications"
                      className={sidebarLinkClass}
                    >
                      <IoNewspaperOutline /> My Applications
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/my-reviews"
                      className={sidebarLinkClass}
                    >
                      <MdOutlineReviews /> My Reviews
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/40 transition text-red-600 dark:text-red-400 font-medium"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40 z-20 md:hidden"
            onClick={() => setOpen(false)}
          ></div>
        )}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl z-30 transform md:hidden transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          } pt-[68px] flex flex-col`}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-blue-600 dark:text-blue-300">Dashboard Menu</h2>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <FiX size={22} />
            </button>
          </div>
          <nav className="p-4 flex-1 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/dashboard/my-profile"
                  onClick={() => setOpen(false)}
                  className={sidebarLinkClass}
                >
                  <FiUser /> Profile
                </NavLink>
              </li>

              {/* Admin Links - Mobile */}
              {data?.role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/add-scolership"
                      onClick={() => setOpen(false)}
                      className={sidebarLinkClass}
                    >
                      <IoIosAddCircle /> Add Scholarship
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manage-scolership"
                      onClick={() => setOpen(false)}
                      className={sidebarLinkClass}
                    >
                      <MdManageHistory /> Manage Scholarship
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manage-users"
                      onClick={() => setOpen(false)}
                      className={sidebarLinkClass}
                    >
                      <FaUsers /> Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/analytics"
                      onClick={() => setOpen(false)}
                      className={sidebarLinkClass}
                    >
                      <IoMdAnalytics /> Analytics
                    </NavLink>
                  </li>
                </>
              )}

              {/* Moderator Links - Mobile */}
              {data?.role === "moderator" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/manage-applications"
                      onClick={() => setOpen(false)}
                      className={sidebarLinkClass}
                    >
                      <FaRegNewspaper /> Manage Applications
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/all-reviews"
                      onClick={() => setOpen(false)}
                      className={sidebarLinkClass}
                    >
                      <MdReviews /> All Reviews
                    </NavLink>
                  </li>
                </>
              )}

              {/* Student Links - Mobile */}
              {data?.role === "student" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/my-applications"
                      onClick={() => setOpen(false)}
                      className={sidebarLinkClass}
                    >
                      <IoNewspaperOutline /> My Applications
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/my-reviews"
                      onClick={() => setOpen(false)}
                      className={sidebarLinkClass}
                    >
                      <MdOutlineReviews /> My Reviews
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {/* Logout Button - Mobile */}
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/40 transition text-red-600 dark:text-red-400 font-medium"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
