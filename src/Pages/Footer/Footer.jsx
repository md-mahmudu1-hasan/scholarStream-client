import React from "react";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiGithub } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-14 mt-16 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-3xl font-bold tracking-wide mb-3">ScholarStream</h2>
          <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
            ScholarStream is a platform that connects students with financial assistance opportunities.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:justify-center gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-3">Company</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li><a className="hover:text-gray-200">About Us</a></li>
              <li><a className="hover:text-gray-200">Careers</a></li>
              <li><a className="hover:text-gray-200">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li><a className="hover:text-gray-200">Help Center</a></li>
              <li><a className="hover:text-gray-200">Terms & Services</a></li>
              <li><a className="hover:text-gray-200">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Right: Social Icons */}
        <div className="flex flex-col items-start md:items-end gap-4">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex items-center gap-5 text-2xl">
            <a href="#" className="hover:text-gray-300 transition"><FiFacebook /></a>
            <a href="#" className="hover:text-gray-300 transition"><FiInstagram /></a>
            <a href="#" className="hover:text-gray-300 transition"><FiTwitter /></a>
            <a href="#" className="hover:text-gray-300 transition"><FiYoutube /></a>
            <a href="#" className="hover:text-gray-300 transition"><FiGithub /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ScholarStream — All Rights Reserved.
      </div>
    </footer>
  );
}