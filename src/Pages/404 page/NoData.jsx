import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col mt-17 items-center justify-center min-h-screen bg-white p-6">
      {/* 404 Text */}
      <h1 className="text-9xl font-extrabold text-blue-600 animate-pulse">404</h1>

      {/* Subtitle */}
      <h2 className="text-3xl md:text-4xl font-semibold mt-4 text-gray-700">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-500 mt-2 text-center max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Home Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        Go Back Home
      </Link>

      {/* Optional Illustration */}
      <div className="mt-10">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404 Illustration"
          className="w-80 md:w-96"
        />
      </div>
    </div>
  );
};

export default NotFound;
