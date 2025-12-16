import { ClimbingBoxLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center ">
      <ClimbingBoxLoader
        color="#0CAAFB"
        size={15}
        aria-label="Loading Spinner"
      />

      <p className="mt-6 text-gray-600 text-sm tracking-wide animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loader;
