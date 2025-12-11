import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";

export default function ScholarshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);

  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get(`/scholarship/${id}`)
      .then((res) => setScholarship(res.data))
      .catch((err) => console.log(err));

    axiosInstance
      .get(`/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  console.log(reviews);

  if (!scholarship) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-17 p-4">
      <h1 className="text-3xl font-bold mb-2 text-center py-6">
        {scholarship.scholarshipName}
      </h1>
      <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-lg p-6">
        <img
          src={scholarship.universityImage}
          alt={scholarship.universityName}
          className="w-full md:w-1/3 h-64 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{scholarship.name}</h1>
          <p className="text-gray-500 mb-1">
            University: {scholarship.universityName}
          </p>
          <p className="text-gray-500 mb-1">
            World Rank: {scholarship.universityWorldRank}
          </p>
          <p className="text-gray-500 mb-1">
            Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
          </p>
          <p className="text-gray-500 mb-1">Location: {scholarship.location}</p>
          <p className="text-gray-500 mb-1">
            Application Fees: ${scholarship.applicationFees}
          </p>
          <p className="text-gray-500 mb-3">Stipend: {scholarship.stipend}</p>
          <p className="mb-4">{scholarship.description}</p>
          <Link
            to={`/payment/${id}`}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Apply for Scholarship
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={review.userImage}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{review.userName}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < review.ratingPoint
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p>{review.reviewComment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
