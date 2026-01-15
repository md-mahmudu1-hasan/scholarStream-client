import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { FaStar } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import Loader from "../Loader/Loader";
import Container from "../../Shared/Container";

export default function ScholarshipDetails() {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [scholarshipRes, reviewsRes] = await Promise.all([
          axiosInstance.get(`/scholarship/${id}`),
          axiosInstance.get(`/reviews/${id}`),
        ]);
        setScholarship(scholarshipRes.data);
        setReviews(reviewsRes.data);
      } catch (error) {
        toast.error("Failed to load scholarship details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, axiosInstance]);

  const handleApply = async () => {
    const applicationData = {
      ApplicantName: user?.displayName,
      ApplicantEmail: user?.email,
      scholarshipId: id,
      ScholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      universityAddress: scholarship.location,
      feedback: "No feedback yet",
      subjectCategory: scholarship.subjectCategory,
      applicationFees: scholarship.applicationFees,
      applicationStatus: "Pending",
      subject: scholarship.subject,
      category: scholarship.category,
    };

    try {
      const res = await axiosInstance.post("/applications", applicationData);
      navigate(`/payment/${res.data.insertedId}`);
      toast.success("Application submitted successfully. Now do payment");
    } catch {
      toast.error("Error submitting application");
    }
  };

  if (loading) return <Loader />;

  return (
    <Container>
      <div className="mx-auto mt-17 p-4 bg-white dark:bg-black min-h-screen">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-2 text-center py-6 dark:text-white text-gray-900">
          {scholarship.scholarshipName}
        </h1>

        {/* Main Card */}
        <div
          className="
        flex flex-col md:flex-row gap-6
        bg-white dark:bg-[#0b0b0b]
        border border-gray-200 dark:border-gray-800
        shadow-lg dark:shadow-black/40
        rounded-lg p-6
        "
        >
          <img
            src={scholarship.universityImage}
            alt={scholarship.universityName}
            className="w-full md:w-1/3 h-64 object-cover rounded-lg"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              {scholarship.universityName}
            </h2>

            <p className="mb-1 dark:text-gray-100">
              <span className="font-semibold">University:</span>{" "}
              {scholarship.universityName}
            </p>

            <p className="mb-1 dark:text-gray-100">
              <span className="font-semibold">World Rank:</span>{" "}
              {scholarship.universityWorldRank || "-"}
            </p>

            <p className="mb-1 dark:text-gray-100">
              <span className="font-semibold">Deadline:</span>{" "}
              {new Date(scholarship.deadline).toLocaleDateString()}
            </p>

            <p className="mb-1 dark:text-gray-100">
              <span className="font-semibold">Location:</span>{" "}
              {scholarship.location}
            </p>

            <p className="mb-1 dark:text-gray-100">
              <span className="font-semibold">Application Fees:</span> $
              {scholarship.applicationFees}
            </p>

            <p className="mb-3 dark:text-gray-100">
              <span className="font-semibold">Stipend:</span>{" "}
              {scholarship.stipend}
            </p>

            <p className="mb-4 dark:text-gray-100">{scholarship.description}</p>
            {user?.email ? (
              <button
                onClick={handleApply}
                className="
            bg-blue-600 hover:bg-blue-700
            text-white px-6 py-3 rounded-lg
            font-semibold transition
            "
              >
                Apply for Scholarship
              </button>
            ) : (
              <Link
                to="/login"
                className="
            bg-blue-600 hover:bg-blue-700
            text-white px-6 py-3 rounded-lg
            font-semibold transition
            "
              >
                Apply for Scholarship
              </Link>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">
            Reviews
          </h2>

          {reviews.length === 0 && (
            <p className="dark:text-gray-100">No reviews yet.</p>
          )}

          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="
              bg-white dark:bg-[#0b0b0b]
              border border-gray-200 dark:border-gray-800
              p-4 rounded-lg shadow dark:shadow-black/20
              "
              >
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold dark:text-white">
                      {review.userName}
                    </p>
                    <p className="text-sm dark:text-gray-400">
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
                            : "text-gray-500 dark:text-gray-600"
                        }
                      />
                    ))}
                  </div>
                </div>

                <p className="dark:text-gray-100">{review.reviewComment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
