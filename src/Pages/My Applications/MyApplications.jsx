import { useState, useEffect } from "react";
import useAxios from "../../Hooks/useAxios";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const MyApplications = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reviewData, setReviewData] = useState({
    ratingPoint: 0,
    reviewComment: "",
  });

  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/applications?email=${user.email}`)
        .then((res) => setApplications(res.data));
    }
  }, [user, axiosInstance]);

  // Delete Application
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/applications/${id}`);
          setApplications(applications.filter((a) => a._id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "Your application has been deleted.",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the application.",
            icon: "error",
          });
        }
      }
    });
  };

  // Submit Review
  const handleReviewSubmit = (id, name, nametwo) => {
    axiosInstance
      .post(`/reviews/${id}`, {
        universityName: name,
        ScholarshipName: nametwo,
        userName: user?.displayName,
        userEmail: user?.email,
        userImage: user?.photoURL,
        ratingPoint: reviewData.ratingPoint,
        reviewComment: reviewData.reviewComment,
        reviewDate: new Date(),
      })
      .then(() => {
        setShowReview(false);
        setReviewData({ ratingPoint: 0, reviewComment: "" });
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">My Applications</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">University Name</th>
              <th className="p-3 border">University Address</th>
              <th className="p-3 border">Feedback</th>
              <th className="p-3 border">Subject</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Application Fees</th>
              <th className="p-3 border">Payment Status</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="text-center border">
                <td className="p-3 border">{app.universityName}</td>
                <td className="p-3 border">{app.universityAddress}</td>
                <td className="p-3 border">
                  {app.feedback || "No feedback yet"}
                </td>
                <td className="p-3 border">{app.subject}</td>
                <td className="p-3 border">{app.category}</td>
                <td className="p-3 border">${app.applicationFees}</td>
                <td className="p-3 border capitalize">{app.paymentStatus}</td>
                <td className="p-3 border capitalize">
                  {app.applicationStatus}
                </td>

                <td className="p-3 border">
                  <div className="flex flex-col gap-2 items-start">
                    {/* Details */}
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setShowDetails(true);
                      }}
                      className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-1 rounded w-full"
                    >
                      Details
                    </button>

                    {/* Edit */}
                    {app.applicationStatus === "Pending" && (
                      <button className="bg-yellow-500 hover:bg-yellow-900 text-white px-4 py-1 rounded w-full">
                        Edit
                      </button>
                    )}

                    {/* Pay */}
                    {app.applicationStatus === "Pending" &&
                      app.paymentStatus === "Unpaid" && (
                        <Link
                          to={`/payment/${app._id}`}
                          className="bg-green-600 hover:bg-green-900 text-white px-4 py-1 rounded w-full"
                        >
                          Pay
                        </Link>
                      )}

                    {/* Delete */}
                    {app.applicationStatus === "Pending" && (
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="bg-red-600 hover:bg-red-400 text-white px-4 py-1 rounded w-full"
                      >
                        Delete
                      </button>
                    )}

                    {/* Add Review */}
                    {app.applicationStatus === "Completed" && (
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setShowReview(true);
                        }}
                        className="bg-purple-600 hover:bg-purple-400 text-white px-4 py-1 rounded w-full"
                      >
                        Add Review
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {showDetails && selectedApp && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl flex flex-col justify-center">
            <h2 className="text-xl font-semibold mb-4">Application Details</h2>

            <p>
              <b>University:</b> {selectedApp.universityName}
            </p>
            <p>
              <b>Address:</b> {selectedApp.universityAddress}
            </p>
            <p>
              <b>Subject:</b> {selectedApp.subjectCategory}
            </p>
            <p>
              <b>Fees:</b> {selectedApp.applicationFees}
            </p>
            <p>
              <b>Status:</b> {selectedApp.applicationStatus}
            </p>
            <p>
              <b>Feedback:</b> {selectedApp.feedback || "No feedback yet"}
            </p>

            <button
              onClick={() => setShowDetails(false)}
              className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReview && selectedApp && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Review</h2>

            <label className="block font-medium">Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={reviewData.ratingPoint}
              onChange={(e) =>
                setReviewData({ ...reviewData, ratingPoint: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mt-1"
            />

            <label className="block font-medium mt-3">Comment</label>
            <textarea
              value={reviewData.reviewComment}
              onChange={(e) =>
                setReviewData({ ...reviewData, reviewComment: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mt-1"
            ></textarea>

            <button
              onClick={() =>
                handleReviewSubmit(
                  selectedApp.scholarshipId,
                  selectedApp.universityName,
                  selectedApp.ScholarshipName
                )
              }
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Submit Review
            </button>

            <button
              onClick={() => setShowReview(false)}
              className="mt-4 ml-3 bg-gray-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
