import { useState, useEffect } from "react";
import useAxios from "../../Hooks/useAxios";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

const MyApplications = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();

  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  const [showDetails, setShowDetails] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [editSubject, setEditSubject] = useState("");

  const [reviewData, setReviewData] = useState({
    ratingPoint: 0,
    reviewComment: "",
  });
  const [loading, setLoading] = useState(false);
  // Load applications
  useEffect(() => {
    if (!user?.email) return;

    const fetchApplications = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get(
          `/applications?email=${user.email}`
        );
        setApplications(res.data);
      } catch (error) {
        toast.error("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user?.email, axiosInstance]);

  // Delete Application
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/applications/${id}`);
          setApplications(applications.filter((a) => a._id !== id));
          Swal.fire("Deleted!", "Application deleted.", "success");
        } catch {
          Swal.fire("Error!", "Delete failed.", "error");
        }
      }
    });
  };

  // Open Edit Modal
  const handleEdit = (app) => {
    setSelectedApp(app);
    setEditSubject(app.subject);
    setShowEdit(true);
  };

  // Update Subject (PATCH)
  const handleUpdateSubject = async () => {
    try {
      await axiosInstance.patch(`/applications/${selectedApp._id}`, {
        subject: editSubject,
      });

      setApplications((prev) =>
        prev.map((app) =>
          app._id === selectedApp._id ? { ...app, subject: editSubject } : app
        )
      );

      toast.success("Subject updated successfully");
      setShowEdit(false);
    } catch {
      toast.error("Update failed");
    }
  };

  // Submit Review
  const handleReviewSubmit = (id, uniName, scholarshipName) => {
    axiosInstance
      .post(`/reviews/${id}`, {
        universityName: uniName,
        ScholarshipName: scholarshipName,
        userName: user?.displayName,
        userEmail: user?.email,
        userImage: user?.photoURL,
        ratingPoint: reviewData.ratingPoint,
        reviewComment: reviewData.reviewComment,
        reviewDate: new Date(),
      })
      .then(() => {
        toast.success("Review submitted ");
        setShowReview(false);
        setReviewData({ ratingPoint: 0, reviewComment: "" });
      });
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">My Applications</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-600">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="border p-2">University</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Feedback</th>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Fees</th>
              <th className="border p-2">Payment</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="text-center hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border p-2">{app.universityName}</td>
                <td className="border p-2">{app.universityAddress}</td>
                <td className="border p-2">{app.feedback || "No feedback"}</td>
                <td className="border p-2">{app.subject}</td>
                <td className="border p-2">{app.category}</td>
                <td className="border p-2">${app.applicationFees}</td>
                <td className="border p-2">{app.paymentStatus}</td>
                <td className="border p-2">{app.applicationStatus}</td>

                <td className="border p-2">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setShowDetails(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-1 rounded transition"
                    >
                      Details
                    </button>

                    {app.applicationStatus === "Pending" && (
                      <>
                        <button
                          onClick={() => handleEdit(app)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded transition"
                        >
                          Edit
                        </button>

                        {app.paymentStatus === "Unpaid" && (
                          <Link
                            to={`/payment/${app._id}`}
                            className="bg-green-600 hover:bg-green-700 text-white py-1 rounded transition"
                          >
                            Pay
                          </Link>
                        )}

                        <button
                          onClick={() => handleDelete(app._id)}
                          className="bg-red-600 hover:bg-red-700 text-white py-1 rounded transition"
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {app.applicationStatus === "Completed" && (
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setShowReview(true);
                        }}
                        className="bg-purple-600 hover:bg-purple-700 text-white py-1 rounded transition"
                      >
                        Add Review
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {applications.length === 0 && (
              <tr>
                <td colSpan="9" className="py-8 text-center text-gray-500 dark:text-gray-400">
                  No Applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {showReview && selectedApp && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Add Review for {selectedApp?.universityName}
            </h2>

            {/* Rating */}
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={reviewData.ratingPoint}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    ratingPoint: Number(e.target.value),
                  })
                }
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Comment */}
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Comment</label>
              <textarea
                value={reviewData.reviewComment}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    reviewComment: e.target.value,
                  })
                }
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={4}
                placeholder="Write your review here..."
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => {
                  setShowReview(false);
                  setReviewData({ ratingPoint: 0, reviewComment: "" });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleReviewSubmit(
                    selectedApp?.scholarshipId,
                    selectedApp?.universityName,
                    selectedApp?.ScholarshipName
                  )
                }
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Application Details</h2>

            <p>
              <b>Name:</b> {selectedApp.ApplicantName}
            </p>
            <p>
              <b>Email:</b> {selectedApp.ApplicantEmail}
            </p>
            <p>
              <b>University:</b> {selectedApp.universityName}
            </p>
            <p>
              <b>Address:</b> {selectedApp.universityAddress}
            </p>
            <p>
              <b>Category:</b> {selectedApp.subjectCategory}
            </p>
            <p>
              <b>Status:</b> {selectedApp.applicationStatus}
            </p>
            <p>
              <b>Payment:</b> {selectedApp.paymentStatus || "Unpaid"}
            </p>
            <p>
              <b>Feedback:</b> {selectedApp.feedback || "No feedback"}
            </p>

            <button
              onClick={() => setShowDetails(false)}
              className="mt-4 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEdit && selectedApp && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Edit Application Subject
            </h2>

            <input
              value={editSubject}
              onChange={(e) => setEditSubject(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowEdit(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubject}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
