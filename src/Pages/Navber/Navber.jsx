import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router";
import Container from "../../Shared/Container";
import useAuth from "../../Hooks/useAuth";
import "./Navber.css";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, SignOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleMenuClick = () => {
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    SignOut();
    handleMenuClick();
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "underline font-semibold dark:text-sky-400"
      : "hover:underline dark:hover:text-sky-300";

  return (
    <Container>
      <nav
        className="
        fixed top-0 left-0 z-50 w-full px-12
        bg-linear-to-r from-white/70 to-gray-200/70
        dark:from-gray-700 dark:to-gray-900
        shadow-sm transition-all duration-300
        "
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link to="/" className="select-none">
            <img
              className="w-13 h-full object-cover"
              src="https://i.ibb.co.com/WvDXKbPf/Gemini-Generated-Image-t7ay06t7ay06t7ay-1.png"
              alt="Logo"
            />
          </Link>
          <label className="flex items-center cursor-pointer space-x-2">
            <span className="text-sm font-medium dark:text-gray-200">
              {theme === "dark" ? "Dark" : "Light"}
            </span>
            <input
              onChange={(e) => handleTheme(e.target.checked)}
              type="checkbox"
              defaultChecked={localStorage.getItem("theme") === "dark"}
              className="toggle"
            />
          </label>

          {/* Desktop Menu */}
          <ul
            className="
            hidden md:flex items-center space-x-8
            text-[15px] font-medium
            text-gray-700 dark:text-white
            "
          >
            <NavLink to="/" onClick={handleMenuClick} className={navLinkClass}>
              Home
            </NavLink>

            <NavLink
              to="/all-scholarships"
              onClick={handleMenuClick}
              className={navLinkClass}
            >
              All Scholarships
            </NavLink>

            <NavLink
              to="/about"
              onClick={handleMenuClick}
              className={navLinkClass}
            >
              About
            </NavLink>

            <NavLink
              to="/blog"
              onClick={handleMenuClick}
              className={navLinkClass}
            >
              Blog
            </NavLink>

            <NavLink
              to="/support"
              onClick={handleMenuClick}
              className={navLinkClass}
            >
              Help / Support
            </NavLink>

            {user ? (
              <div className="relative">
                <img
                  src={user?.photoURL}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full border dark:border-gray-600 cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />

                {dropdownOpen && (
                  <div
                    className="
                    absolute right-0 mt-2 w-40
                    bg-white dark:bg-black
                    border dark:border-gray-700
                    rounded-md shadow-lg
                    text-gray-800 dark:text-white
                    "
                  >
                    <Link
                      to="/dashboard"
                      onClick={handleMenuClick}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={handleMenuClick}
                  className={navLinkClass}
                >
                  LOG IN
                </Link>

                <Link
                  to="/signup"
                  onClick={handleMenuClick}
                  className="bg-green-700 hover:bg-green-800 transition text-white px-5 py-2 rounded-full"
                >
                  SIGN UP
                </Link>
              </>
            )}
          </ul>

          {/* Mobile Icon */}
          <button
            className="md:hidden text-gray-800 dark:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
          md:hidden overflow-hidden transition-all duration-300
          bg-white dark:bg-black
          ${mobileOpen ? "max-h-[500px] py-4" : "max-h-0"}
          `}
        >
          <ul
            className="
            flex flex-col space-y-4 px-6
            font-medium
            text-gray-700 dark:text-white
            "
          >
            <Link to="/" onClick={handleMenuClick}>
              Home
            </Link>

            <Link to="/all-scholarships" onClick={handleMenuClick}>
              All Scholarships
            </Link>

            <Link to="/about" onClick={handleMenuClick}>
              About
            </Link>

            <Link to="/blog" onClick={handleMenuClick}>
              Blog
            </Link>

            <Link to="/support" onClick={handleMenuClick}>
              Help / Support
            </Link>

            {user ? (
              <>
                <Link to="/dashboard" onClick={handleMenuClick}>
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={handleMenuClick}
                  className="dark:text-white"
                >
                  LOG IN
                </Link>

                <Link
                  to="/signup"
                  onClick={handleMenuClick}
                  className="bg-green-700 text-white p-2 rounded-full text-center"
                >
                  SIGN UP
                </Link>
              </>
            )}
          </ul>
        </div>
      </nav>
    </Container>
  );
}
