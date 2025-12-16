import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../Hooks/useAxios";
import { Link } from "react-router";
import Container from "../../Shared/Container";

const Topscallership = () => {
  const axiosInstance = useAxios();

  const fetchScholarships = async () => {
    const response = await axiosInstance.get("/scholarship");
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["scholarships"],
    queryFn: fetchScholarships,
  });

  const topScholarships = data?.data?.slice(0, 6);

  if (isLoading) return <p>Loading scholarships...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <Container>
      <div className="max-w-screen-4xl mx-auto">
        <h1 className="text-3xl font-bold py-6 text-center">
          Top Scholarships
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
          {topScholarships?.map((scholar) => (
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
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Topscallership;
