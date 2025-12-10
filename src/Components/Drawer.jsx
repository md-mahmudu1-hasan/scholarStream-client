import React, { useState } from "react";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const Drawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="min-h-screen flex bg-gray-100">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden m-3 p-2 bg-white shadow rounded flex items-center gap-2"
        >
          <FiMenu /> Menu
        </button>

        {/* Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setOpen(false)}
          ></div>
        )}

        {/* Drawer for Mobile */}
        <div
          className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-40 transform md:hidden transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
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
                <a className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <FiHome /> Home
                </a>
              </li>
              <li>
                <a className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <FiUser /> Profile
                </a>
              </li>
              <li>
                <a className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <FiSettings /> Settings
                </a>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t absolute bottom-0 w-full">
            <button className="flex items-center gap-2 w-full p-2 rounded hover:bg-gray-100">
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Drawer;
