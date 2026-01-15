import React from "react";
import Container from "../../Shared/Container";
import { Darkbg } from "../../Shared/Darkbg";

const About = () => {
  return (
    <Darkbg>
      <Container>
        <div className="mt-17 min-h-screen">
          <title>About</title>
          <div className="max-w-4xl mx-auto py-10">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              About ScholarStream
            </h1>
            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              ScholarStream helps students discover scholarships, compare
              opportunities, and apply with confidence. We focus on a clean user
              experience, transparent information, and a smooth application
              journey.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#0b0b0b] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-black/40">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Discover
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Browse scholarships by subject, location, and deadlines.
                </p>
              </div>
              <div className="bg-white dark:bg-[#0b0b0b] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-black/40">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Apply
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Keep track of requirements and submit applications smoothly.
                </p>
              </div>
              <div className="bg-white dark:bg-[#0b0b0b] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-black/40">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Succeed
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Get guidance, tips, and insights to improve your chances.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Darkbg>
  );
};

export default About;
