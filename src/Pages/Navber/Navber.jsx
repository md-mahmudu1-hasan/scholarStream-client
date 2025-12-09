import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, Links } from "react-router";
import Container from "../../Shared/Container";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(false);
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  return (
    <Container>
      <nav
        className="  w-full 
  px-5 
  bg-linear-to-r from-white to-gray-200
  shadow-sm 
  fixed top-0 left-0 
  z-50 
  transition-all duration-300"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-1 cursor-pointer select-none">
            <Link to="/" className="text-blue-800 font-bold text-2xl">
              ScholarStream
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8 text-[15px] font-medium text-gray-700">
            <Link
              to="/"
              onClick={handleMenuClick}
              className="hover:text-blue-700 cursor-pointer transition"
            >
              Home
            </Link>

            <Link
              to="/all-scholarships"
              onClick={handleMenuClick}
              className="hover:text-blue-700 cursor-pointer transition"
            >
              All Scholarships
            </Link>

            <Link
              to="/login"
              onClick={handleMenuClick}
              className="text-blue-700 font-semibold cursor-pointer hover:opacity-80 transition"
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
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-[500px] py-4" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col space-y-4 px-6">
            <Link
              to="/"
              onClick={handleMenuClick}
              className="font-medium cursor-pointer"
            >
              Home
            </Link>

            <Link
              to="/all-scholarships"
              onClick={handleMenuClick}
              className="font-medium cursor-pointer"
            >
              All Scholarships
            </Link>

            <Link
              to="/login"
              onClick={handleMenuClick}
              className="text-blue-700 font-semibold cursor-pointer"
            >
              LOG IN
            </Link>

            <Link
              to="/signup"
              onClick={handleMenuClick}
              className="w-full bg-green-700 text-white px-2 p-2 rounded-full"
            >
              SIGN UP
            </Link>
          </ul>
        </div>
      </nav>
    </Container>
  );
}
