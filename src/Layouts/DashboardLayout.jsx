import { useState } from "react"; 
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import { Outlet, Link, NavLink, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { IoIosAddCircle } from "react-icons/io";
import { MdManageHistory, MdOutlineReviews, MdReviews } from "react-icons/md";
import { FaRegNewspaper, FaUsers } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
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

  const sidebarLinkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
      isActive ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-30 md:pl-72 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            <FiMenu size={22} />
          </button>
          <Link to="/">
            <img
              src="https://i.ibb.co/wNw5Qvvm/short.png"
              alt="Logo"
              className="h-10 object-contain"
            />
          </Link>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:flex-col md:w-64 bg-white shadow-lg fixed top-0 left-0 bottom-0 pt-16">
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <NavLink to="/dashboard/my-profile" className={sidebarLinkClass}>
                  <FiUser /> Profile
                </NavLink>
              </li>

              {data?.role === "admin" && (
                <>
                  <li>
                    <NavLink to="/dashboard/add-scolership" className={sidebarLinkClass}>
                      <IoIosAddCircle /> Add Scholarship
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manage-scolership" className={sidebarLinkClass}>
                      <MdManageHistory /> Manage Scholarship
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manage-users" className={sidebarLinkClass}>
                      <FaUsers /> Manage Users
                    </NavLink>
                  </li>
                </>
              )}

              {data?.role === "moderator" && (
                <>
                  <li>
                    <NavLink to="/dashboard/manage-applications" className={sidebarLinkClass}>
                      <FaRegNewspaper /> Manage Applications
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/all-reviews" className={sidebarLinkClass}>
                      <MdReviews /> All Reviews
                    </NavLink>
                  </li>
                </>
              )}

              {data?.role === "student" && (
                <>
                  <li>
                    <NavLink to="/dashboard/my-applications" className={sidebarLinkClass}>
                      <IoNewspaperOutline /> My Applications
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/my-reviews" className={sidebarLinkClass}>
                      <MdOutlineReviews /> My Reviews
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full p-3 rounded-lg hover:bg-gray-100 transition text-red-500 font-medium"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {open && <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={() => setOpen(false)}></div>}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-30 transform md:hidden transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          } pt-16 flex flex-col`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
            <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 transition">
              <FiX size={22} />
            </button>
          </div>
          <nav className="p-4 flex-1 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <NavLink to="/dashboard/my-profile" onClick={() => setOpen(false)} className={sidebarLinkClass}>
                  <FiUser /> Profile
                </NavLink>
              </li>

              {data?.role === "admin" && (
                <>
                  <li>
                    <NavLink to="/dashboard/add-scolership" onClick={() => setOpen(false)} className={sidebarLinkClass}>
                      <IoIosAddCircle /> Add Scholarship
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manage-scolership" onClick={() => setOpen(false)} className={sidebarLinkClass}>
                      <MdManageHistory /> Manage Scholarship
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manage-users" onClick={() => setOpen(false)} className={sidebarLinkClass}>
                      <FaUsers /> Manage Users
                    </NavLink>
                  </li>
                </>
              )}

              {data?.role === "moderator" && (
                <>
                  <li>
                    <NavLink to="/dashboard/manage-applications" onClick={() => setOpen(false)} className={sidebarLinkClass}>
                      <FaRegNewspaper /> Manage Applications
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/all-reviews" onClick={() => setOpen(false)} className={sidebarLinkClass}>
                      <MdReviews /> All Reviews
                    </NavLink>
                  </li>
                </>
              )}

              {data?.role === "student" && (
                <>
                  <li>
                    <NavLink to="/dashboard/my-applications" onClick={() => setOpen(false)} className={sidebarLinkClass}>
                      <IoNewspaperOutline /> My Applications
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/my-reviews" onClick={() => setOpen(false)} className={sidebarLinkClass}>
                      <MdOutlineReviews /> My Reviews
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full p-3 rounded-lg hover:bg-gray-100 transition text-red-500 font-medium"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-6 bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
