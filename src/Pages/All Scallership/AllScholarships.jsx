import React, { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Container from "../../Shared/Container";
import LoaderCard from "../LoaderCard/LoaderCard";
import { Darkbg } from "../../Shared/Darkbg";

const AllScholarships = () => {
  const axiosInstance = useAxios();

  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("date_desc");

  const limit = 8;

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

  const { data, isFetching, isError } = useQuery({
    queryKey: ["scholarships", { page, search, subject, location, sort }],
    queryFn: fetchScholarships,
    keepPreviousData: true,
  });

  if (isError)
    return (
      <p className="text-center mt-10 text-gray-900 dark:text-white">
        Error loading data
      </p>
    );

  const scholarships = data?.data || [];

  return (
        <Darkbg>
    <Container>
      <div className="mt-17 min-h-screen">

        {/* Title */}
        <h1 className="text-3xl font-bold py-6 text-center text-gray-900 dark:text-white">
          All Scholarships
        </h1>

        {/* Search */}
        <div className="max-w-3xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Search by Scholarship, University or Degree"
            className="
              w-full p-3 rounded-lg border
              bg-white dark:bg-black
              text-gray-900 dark:text-gray-100
              border-gray-300 dark:border-gray-800
              placeholder-gray-500 dark:placeholder-gray-500
              focus:outline-none
            "
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
            className="
              p-3 rounded-lg border
              bg-white dark:bg-black
              text-gray-900 dark:text-gray-100
              border-gray-300 dark:border-gray-800
            "
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
            className="
              p-3 rounded-lg border
              bg-white dark:bg-black
              text-gray-900 dark:text-gray-100
              border-gray-300 dark:border-gray-800
            "
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
            className="
              p-3 rounded-lg border
              bg-white dark:bg-black
              text-gray-900 dark:text-gray-100
              border-gray-300 dark:border-gray-800
            "
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
            <option value="fee_asc">Fee: Low to High</option>
            <option value="fee_desc">Fee: High to Low</option>
          </select>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
          {isFetching ? (
            <div className="col-span-4 flex justify-center py-20">
              <LoaderCard />
            </div>
          ) : scholarships.length > 0 ? (
            scholarships.map((scholar) => (
              <div
                key={scholar._id}
                className="
                  bg-white dark:bg-[#0b0b0b]
                  border border-gray-200 dark:border-gray-800
                  rounded-2xl
                  shadow-lg dark:shadow-black/40
                  hover:shadow-2xl dark:hover:bg-[#111]
                  transition duration-300 flex flex-col
                "
              >
                <div className="relative overflow-hidden">
                  <img
                    src={scholar.universityImage}
                    alt={scholar.scholarshipName}
                    className="h-52 w-full object-cover rounded-t-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                    <span className="text-white font-semibold text-sm">
                      Rank: {scholar.universityWorldRank || "-"}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                      {scholar.universityName}
                    </h2>

                    <p className="text-sm mb-1 text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Category:</span>{" "}
                      {scholar.category || "International"}
                    </p>

                    <p className="text-sm mb-1 text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Location:</span>{" "}
                      {scholar.location}
                    </p>

                    <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">
                        Application Fees:
                      </span>{" "}
                      {scholar.applicationFees || "Free"}
                    </p>
                  </div>

                  <Link
                    to={`/scholarship/${scholar._id}`}
                    className="
                      mt-4 w-full text-center
                      bg-gradient-to-r from-blue-600 to-indigo-600
                      text-white font-semibold py-2 rounded-xl
                      hover:scale-105 transition
                    "
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-900 dark:text-white">
              No scholarships found
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-10 flex-wrap pb-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="
              px-4 py-2 border rounded
              text-gray-900 dark:text-gray-200
              border-gray-300 dark:border-gray-800
              dark:bg-black
              disabled:opacity-50
            "
          >
            Prev
          </button>

          {[...Array(data?.totalPages || 0).keys()].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p + 1)}
              className={`px-4 py-2 border rounded
                ${
                  page === p + 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-800 dark:bg-black"
                }`}
            >
              {p + 1}
            </button>
          ))}

          <button
            disabled={page === data?.totalPages}
            onClick={() => setPage(page + 1)}
            className="
              px-4 py-2 border rounded
              text-gray-900 dark:text-gray-200
              border-gray-300 dark:border-gray-800
              dark:bg-black
              disabled:opacity-50
            "
          >
            Next
          </button>
        </div>
      </div>
    </Container>
    </Darkbg>
  );
};

export default AllScholarships;
