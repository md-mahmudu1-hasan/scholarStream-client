import React from "react";

const LoaderCard = ({ count = 8 }) => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="
              flex flex-col items-center gap-4
              w-full mx-auto max-w-xs
            "
          >
            <div
              className="
                h-72 w-full rounded-lg
                animate-pulse
                dark:bg-gray-200 bg-gray-800
              "
            ></div>
            <div
              className="
                h-4 w-full rounded
                animate-pulse
                dark:bg-gray-200 bg-gray-700
              "
            ></div>

            <div
              className="
                h-4 w-3/4 rounded
                animate-pulse
                bg-gray-200 dark:bg-gray-700
              "
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoaderCard;
