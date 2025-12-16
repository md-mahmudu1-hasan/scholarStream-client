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

  // Enhanced sidebar link class for blue and white theme
  const sidebarLinkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-blue-50 text-blue-700 font-bold"
        : "hover:bg-gray-100 text-gray-700"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="w-full bg-linear-to-br from-blue-200 to-gray-200 shadow-xl z-30 md:pl-64 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4 text-white">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 bg-blue-700 rounded-lg hover:bg-blue-800 transition"
          >
            <FiMenu size={22} />
          </button>
          {/* Logo and Back to Home Link */}
          <Link
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-700 transition duration-200"
            to="/"
          >
            <IoArrowBackCircleOutline size={22} className="text-white" />
            <span className="font-semibold hidden sm:inline text-white">
              Back to home
            </span>
          </Link>
        </div>
            <img
              src="https://i.ibb.co/wNw5Qvvm/short.png"
              alt="Logo"
              className="h-10 w-20 object-contain ml-4"
            />
      </header>

      <div className="flex flex-1 pt-[68px]">
        {/* Desktop Sidebar (White) */}
        <aside className="hidden md:flex md:flex-col md:w-64 bg-white shadow-lg fixed top-0 left-0 bottom-0 pt-[68px]">
          <nav className="flex-1 p-4 overflow-y-auto">
            <h3 className="text-xs text-gray-400 uppercase font-semibold mb-3 tracking-wider">
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

          <div className="p-4 border-t">
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full p-3 rounded-lg hover:bg-red-50 transition text-red-600 font-medium"
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
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-30 transform md:hidden transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          } pt-[68px] flex flex-col`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-bold text-blue-600">Dashboard Menu</h2>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
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
          <div className="p-4 border-t">
            {/* Logout Button - Mobile */}
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full p-3 rounded-lg hover:bg-red-50 transition text-red-600 font-medium"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 p-6 bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;