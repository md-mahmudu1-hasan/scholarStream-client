import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router";
import Container from "../../Shared/Container";
import "./Navber.css";
import useAuth from "../../Hooks/useAuth";
import Loader from "../Loader/Loader";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, SignOut } = useAuth();

  const handleMenuClick = () => {
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    SignOut();
    handleMenuClick();
  };

  return (
    <Container>
      <nav
        className="w-full px-12 bg-linear-to-r from-white/70 to-gray-200/70
        shadow-sm fixed top-0 left-0 z-50 transition-all duration-300"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-1 cursor-pointer select-none">
            <Link to="/" className="text-blue-800 font-bold text-2xl">
              <img className="w-13 h-full object-cover" src="https://i.ibb.co.com/WvDXKbPf/Gemini-Generated-Image-t7ay06t7ay06t7ay-1.png" alt="" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8 text-[15px] font-medium text-gray-700">
            <NavLink
              to="/"
              onClick={handleMenuClick}
              className="hover:text-blue-700 transition"
            >
              Home
            </NavLink>

            <NavLink
              to="/all-scholarships"
              onClick={handleMenuClick}
              className="hover:text-blue-700 transition"
            >
              All Scholarships
            </NavLink>
            {/* If User Logged In → Show Profile + Dropdown */}
            {user ? (
              <div className="relative">
                <img
                  src={user?.photoURL}
                  alt="User"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full border cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={handleMenuClick}
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
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
                  className="text-blue-700 font-semibold hover:opacity-80 transition"
                >
                  LOG IN
                </Link>

                <li>
                  <Link
                    to="/signup"
                    onClick={handleMenuClick}
                    className="bg-green-700 hover:bg-green-800 transition text-white px-5 py-2 rounded-full"
                  >
                    SIGN UP
                  </Link>
                </li>
              </>
            )}
          </ul>
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
        <div
          className={`md:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-[500px] py-4" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col space-y-4 px-6">
            <Link to="/" onClick={handleMenuClick} className="font-medium">
              Home
            </Link>

            <Link
              to="/all-scholarships"
              onClick={handleMenuClick}
              className="font-medium"
            >
              All Scholarships
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={handleMenuClick}
                  className="font-medium"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    logout();
                    handleMenuClick();
                  }}
                  className="text-left font-medium text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={handleMenuClick}
                  className="text-blue-700 font-semibold"
                >
                  LOG IN
                </Link>

                <Link
                  to="/signup"
                  onClick={handleMenuClick}
                  className="w-full bg-green-700 text-white px-2 p-2 rounded-full text-center"
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
