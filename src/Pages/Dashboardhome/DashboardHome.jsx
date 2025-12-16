import React from "react";

const DashboardHome = () => {
  return (
    <div className="flex-1 w-full mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome to Dashboard</h1>

      <div className="bg-white p-6 rounded shadow-md max-w-md">
        <h2 className="text-xl font-semibold mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">
          This is your main dashboard area. You can show key metrics, stats, or
          any important information here.
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;
