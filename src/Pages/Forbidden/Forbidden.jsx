import { Link } from "react-router";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function Forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-200 text-white px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full text-center bg-black/60 backdrop-blur rounded-2xl shadow-xl p-8"
      >
        <div className="flex justify-center mb-4">
          <Lock className="w-14 h-14 text-red-400" />
        </div>

        <h1 className="text-3xl font-bold mb-2">403 – Forbidden</h1>
        <p className="text-slate-300 mb-6">
          You don’t have permission to access this page.
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            to="/"
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
