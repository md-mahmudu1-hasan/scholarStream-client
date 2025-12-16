import { useState, useEffect } from "react";
import useAxios from "../../Hooks/useAxios";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

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

  // Load applications
  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/applications?email=${user?.email}`)
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
        toast.success("Review submitted");
        setShowReview(false);
        setReviewData({ ratingPoint: 0, reviewComment: "" });
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">My Applications</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-200">
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
              <tr key={app._id} className="text-center">
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
                      className="bg-blue-600 text-white py-1 rounded"
                    >
                      Details
                    </button>

                    {app.applicationStatus === "Pending" && (
                      <>
                        <button
                          onClick={() => handleEdit(app)}
                          className="bg-yellow-500 text-white py-1 rounded"
                        >
                          Edit
                        </button>

                        {app.paymentStatus === "Unpaid" && (
                          <Link
                            to={`/payment/${app._id}`}
                            className="bg-green-600 text-white py-1 rounded"
                          >
                            Pay
                          </Link>
                        )}

                        <button
                          onClick={() => handleDelete(app._id)}
                          className="bg-red-600 text-white py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {app.applicationStatus === "Completed" && (
                      <button
                        onClick={() =>
                          handleReviewSubmit(
                            selectedApp.scholarshipId,
                            selectedApp.universityName,
                            selectedApp.ScholarshipName
                          )
                        }
                        className="bg-purple-600 text-white py-1 rounded"
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
                <td colSpan="9" className="py-8 text-center text-gray-500">
                  No Applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEdit && selectedApp && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-semibold mb-4">
              Edit Application Subject
            </h2>

            <input
              value={editSubject}
              onChange={(e) => setEditSubject(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowEdit(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubject}
                className="bg-green-600 text-white px-4 py-2 rounded"
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
