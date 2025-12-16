import React, { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Container from "../../Shared/Container";

const AllScholarships = () => {
  const axiosInstance = useAxios();

  // filters & pagination
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("date_desc");

  const limit = 6;

  const fetchScholarships = async ({ queryKey }) => {
    const [_key, params] = queryKey;

    const res = await axiosInstance.get("/scholarship", {
      params: {
        page: params.page,
        limit,
        search: params.search,
        subject: params.subject,
        location: params.location,
        sort: params.sort,
      },
    });

    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["scholarships", { page, search, subject, location, sort }],
    queryFn: fetchScholarships,
    keepPreviousData: true,
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10">Error loading data</p>;

  const scholarships = data?.data || [];

  return (
    <Container>
      <div className="mt-12">
        <h1 className="text-3xl font-bold py-6 text-center">
          All Scholarships
        </h1>

        {/* Search */}
        <div className="max-w-3xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Search by Scholarship, University or Degree"
            className="w-full p-3 border rounded-lg"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
          <select
            className="p-3 border rounded-lg"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Subjects</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Business">Business</option>
            <option value="Data Science">Data Science</option>
            <option value="Medical">Medical</option>
          </select>

          <select
            className="p-3 border rounded-lg"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setPage(1);
            }}
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
          <select
            className="p-3 border rounded-lg"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
            <option value="fee_asc">Application Fee: Low to High</option>
            <option value="fee_desc">Application Fee: High to Low</option>
          </select>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
          {scholarships.length > 0 ? (
            scholarships.map((scholar) => (
              <div
                key={scholar._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={scholar.universityImage}
                    alt={scholar.scholarshipName}
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
                      {scholar.category || "International"}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      <span className="font-semibold">Location:</span>{" "}
                      {scholar.location}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      <span className="font-semibold">Application Fees:</span>{" "}
                      {scholar.applicationFees || "Free"}
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
            <p className="text-center col-span-3">No scholarships found</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(data.totalPages).keys()].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p + 1)}
              className={`px-4 py-2 border rounded ${
                page === p + 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              {p + 1}
            </button>
          ))}

          <button
            disabled={page === data.totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </Container>
  );
};

export default AllScholarships;
