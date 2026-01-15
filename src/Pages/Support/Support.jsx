import React from "react";
import Container from "../../Shared/Container";
import { Darkbg } from "../../Shared/Darkbg";

const Support = () => {
  return (
    <Darkbg>
      <Container>
        <div className="mt-17 min-h-screen">
          <title>Help / Support</title>
          <div className="max-w-4xl mx-auto py-10">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Help / Support
            </h1>
            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Need help using ScholarStream? Check the quick answers below. If
              you still need assistance, contact us and we’ll respond as soon as
              possible.
            </p>

            <div className="mt-8 space-y-4">
              <div className="bg-white dark:bg-[#0b0b0b] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-black/40">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  How do I apply for a scholarship?
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Open any scholarship details page and follow the application
                  instructions. Keep your required documents ready before you
                  submit.
                </p>
              </div>
              <div className="bg-white dark:bg-[#0b0b0b] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-black/40">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Why can’t I access the dashboard?
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  You must be logged in to access the dashboard. If you’re logged
                  in and still see an issue, please try signing out and signing
                  in again.
                </p>
              </div>
              <div className="bg-white dark:bg-[#0b0b0b] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-black/40">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Contact
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Email: support@scholarstream.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Darkbg>
  );
};

export default Support;
