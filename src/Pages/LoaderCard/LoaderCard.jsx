import React from "react";

const LoaderCard= ({ count = 6 }) => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 w-full mx-auto max-w-xs"
          >
            <div className="skeleton h-70 w-full rounded-lg"></div>
            <div className="skeleton h-4 w-full rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoaderCard;
