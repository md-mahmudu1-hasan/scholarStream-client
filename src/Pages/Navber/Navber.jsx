import { useState } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">

        {/* Logo */}
        <div className="flex items-center space-x-1 cursor-pointer select-none">
          <span className="text-blue-800 font-bold text-2xl">ScholarStream</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-[15px] font-medium text-gray-700">

          {/* Dropdown 2 */}
          <li className="relative ">
            {/*  */}
          <span className="hover:text-blue-700 cursor-pointer transition">Home</span>
          </li>

          <li className="hover:text-blue-700 cursor-pointer transition">STUDENT LOANS</li>
          <li className="hover:text-blue-700 cursor-pointer transition">STUDENT DISCOUNTS</li>

          {/* Dropdown 3 */}
          <li className="relative">
            {/*  */}
          </li>

          <li className="hover:text-blue-700 cursor-pointer transition">EDUCATORS</li>
          <li className="hover:text-blue-700 cursor-pointer transition">PARENTS</li>

          <li className="text-blue-700 font-semibold cursor-pointer hover:opacity-80 transition">
            LOG IN
          </li>

          <li>
            <button className="bg-green-700 hover:bg-green-800 transition text-white px-5 py-2 rounded-full">
              SIGN UP
            </button>
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

          <li className="font-medium">SCHOLARSHIPS</li>
          <li className="font-medium">FAFSA & FINANCIAL AID</li>
          <li className="font-medium">STUDENT LOANS</li>
          <li className="font-medium">STUDENT DISCOUNTS</li>
          <li className="font-medium">INTERNSHIPS</li>
          <li className="font-medium">EDUCATORS</li>
          <li className="font-medium">PARENTS</li>

          <li className="text-blue-700 font-semibold">LOG IN</li>

          <button className="w-full bg-green-700 text-white py-2 rounded-full">
            SIGN UP
          </button>
        </ul>
      </div>
    </nav>
  );
}
