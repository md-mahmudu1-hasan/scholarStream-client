import React from "react";
import { motion } from "framer-motion";
import Banner from "./Banner";
import Topscallership from "./Topscallership";
import FAQ from "./SuccessFAQ";
import Testimonials from "./ContactTestimonials";
import useAuth from "../../Hooks/useAuth";
import Loader from "../Loader/Loader";

const Home = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="bg-gray-200 dark:bg-black mt-18">
      <Banner />
      <title>Home</title>
      <Topscallership />

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Testimonials />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <FAQ />
      </motion.div>

      {/* Features Section */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto px-4 py-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#0b0b0b] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Search</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Filter scholarships by subject, location, and fees to quickly find what matches you best.
            </p>
          </div>
          <div className="bg-white dark:bg-[#0b0b0b] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Updates</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stay up-to-date with deadlines, new programs, and changes in requirements.
            </p>
          </div>
          <div className="bg-white dark:bg-[#0b0b0b] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Guided Experience</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Follow a smooth flow from discovery to application with clear next steps.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto px-4 py-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#0b0b0b] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Scholarship Listing</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore a curated list of scholarships from universities around the world.
            </p>
          </div>
          <div className="bg-white dark:bg-[#0b0b0b] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Application Tracking</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Keep an eye on your applications, statuses, and important next actions.
            </p>
          </div>
          <div className="bg-white dark:bg-[#0b0b0b] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Review & Feedback</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn from reviews and feedback to improve your future submissions.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto px-4 py-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            "Computer Science",
            "Engineering",
            "Business",
            "Medical",
            "Data Science",
            "Arts",
            "Humanities",
            "Others",
          ].map((item) => (
            <div
              key={item}
              className="bg-white dark:bg-[#0b0b0b] rounded-xl border border-gray-200 dark:border-gray-800 py-4 px-3 text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto px-4 py-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white dark:bg-[#0b0b0b] rounded-2xl border border-gray-200 dark:border-gray-800 py-6 shadow-sm">
            <p className="text-3xl font-bold text-blue-600">500+</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Scholarships Listed</p>
          </div>
          <div className="bg-white dark:bg-[#0b0b0b] rounded-2xl border border-gray-200 dark:border-gray-800 py-6 shadow-sm">
            <p className="text-3xl font-bold text-blue-600">120+</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Universities</p>
          </div>
          <div className="bg-white dark:bg-[#0b0b0b] rounded-2xl border border-gray-200 dark:border-gray-800 py-6 shadow-sm">
            <p className="text-3xl font-bold text-blue-600">3k+</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Applications</p>
          </div>
          <div className="bg-white dark:bg-[#0b0b0b] rounded-2xl border border-gray-200 dark:border-gray-800 py-6 shadow-sm">
            <p className="text-3xl font-bold text-blue-600">98%</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">User Satisfaction</p>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl mx-auto px-4 py-16"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl px-8 py-10 md:px-12 md:py-14 text-center text-white shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Scholarship?</h2>
          <p className="text-sm md:text-base text-blue-100 mb-6">
            Explore hundreds of opportunities and keep track of your applications in one place.
          </p>
          <a
            href="/all-scholarships"
            className="inline-block bg-white text-blue-700 px-6 py-3 rounded-full font-semibold text-sm md:text-base hover:bg-blue-50 transition"
          >
            Browse All Scholarships
          </a>
        </div>
      </motion.section>

      {/* Highlights Section */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto px-4 py-14 pb-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#0b0b0b] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <p className="text-sm font-semibold text-blue-600 mb-1">For Students</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built to make your scholarship journey easier, clearer, and more successful.
            </p>
          </div>
          <div className="bg-white dark:bg-[#0b0b0b] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <p className="text-sm font-semibold text-blue-600 mb-1">For Universities</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showcase programs, manage applications, and reach motivated students.
            </p>
          </div>
          <div className="bg-white dark:bg-[#0b0b0b] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <p className="text-sm font-semibold text-blue-600 mb-1">For Everyone</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A modern, responsive experience that works beautifully on any device.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
