import React, { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Container from "../../Shared/Container";

const AllScholarships = () => {
  const axiosInstance = useAxios();

  // Search + Filters state
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");

  const fetchScholarships = async () => {
    const response = await axiosInstance.get("/scolership");
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["scholarships"],
    queryFn: fetchScholarships,
  });

  if (isLoading) return <p>Loading scholarships...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  // Filtering Logic
  const filteredData = data?.filter((item) => {
    const matchSearch =
      item.scholarshipName.toLowerCase().includes(search.toLowerCase()) ||
      item.universityName.toLowerCase().includes(search.toLowerCase()) ||
      item.degree.toLowerCase().includes(search.toLowerCase());

    const matchSubject = subject ? item.subject === subject : true;
    const matchLocation = location ? item.location === location : true;

    return matchSearch && matchSubject && matchLocation;
  });

  return (
    <Container>
      <div className="mt-12">
        <h1 className="text-3xl font-bold py-6 text-center">
          All Scholarships
        </h1>

        {/* ---------------- Search Bar ---------------- */}
        <div className="max-w-3xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Search by Scholarship Name, University, or Degree..."
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ---------------- Filters ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10">
          {/* subject filter */}
          <select
            className="p-3 border rounded-lg shadow-sm"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">All Subjects</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Business">Business</option>
            <option value="Data Science">Data Science</option>
            <option value="Medical">Medical</option>
          </select>

          {/* location filter */}
          <select
            className="p-3 border rounded-lg shadow-sm"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
            <option value="Germany">Germany</option>
            <option value="Europe">Europe</option>
            <option value="Australia">Australia</option>
            <option value="Japan">Japan</option>
          </select>
        </div>

        {/* ---------------- Scholarship Cards ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
          {filteredData?.length > 0 ? (
            filteredData.map((scholar) => (
              <div
                key={scholar._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={scholar.universityImage}
                    alt={scholar.universityName}
                    className="h-52 w-full object-cover rounded-t-2xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-3">
                    <span className="text-white font-semibold text-sm md:text-base drop-shadow-md">
                      Rank: {scholar.universityWorldRank || "-"}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {scholar.universityName}
                    </h2>
                    <p className="text-sm text-gray-500 mb-1">
                      <span className="font-semibold">Category:</span>{" "}
                      {scholar.category}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      <span className="font-semibold">Location:</span>{" "}
                      {scholar.location}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      <span className="font-semibold">Application Fees:</span>{" "}
                      {scholar.applicationFees}
                    </p>
                  </div>

                  <Link
                    to={`/scholarship/${scholar._id}`}
                    className="mt-4 w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 px-4 rounded-xl hover:scale-105 hover:shadow-lg transition-transform duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg col-span-3">
              No scholarships found matching your search/filter criteria.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AllScholarships;
