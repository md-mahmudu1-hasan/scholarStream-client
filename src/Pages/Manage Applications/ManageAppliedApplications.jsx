import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

export default function ManageAppliedApplications() {
  const axiosInstance = useAxios();
  const [applications, setApplications] = useState([]);

  const [selectedDetails, setSelectedDetails] = useState(null);
  const [feedbackModal, setFeedbackModal] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axiosInstance
      .get("/applications")
      .then((res) => {
        setApplications(res.data);
      })
      .catch(() => {
        toast.error("Failed to load applications");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await axiosInstance.patch(`/applications/${id}`, {
      applicationStatus: newStatus,
    });

    setApplications((prev) =>
      prev.map((app) =>
        app._id === id ? { ...app, applicationStatus: newStatus } : app
      )
    );
  };

  // Cancel Application
  const handleCancel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Canceled it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.patch(`/applications/${id}`, {
          applicationStatus: "Rejected",
        });
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, applicationStatus: "Rejected" } : app
          )
        );
        Swal.fire({
          title: "Canceled!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // Submit Feedback
  const submitFeedback = async () => {
    await axiosInstance.patch(`/applications/${feedbackModal._id}`, {
      feedback: feedbackText,
    });

    setApplications((prev) =>
      prev.map((app) =>
        app._id === feedbackModal._id ? { ...app, feedback: feedbackText } : app
      )
    );

    toast.success("Feedback Submitted");

    setFeedbackModal(null);
    setFeedbackText("");
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Manage Applied Applications
      </h1>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full border border-gray-200 dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-3 border">Applicant Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">University</th>
              <th className="p-3 border">Feedback</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Payment</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="text-center hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border p-3">{app.ApplicantName}</td>
                <td className="border p-3">{app.ApplicantEmail}</td>
                <td className="border p-3">{app.universityName}</td>
                <td className="border p-3">
                  {app.feedback || "No feedback yet"}
                </td>
                <td className="border p-3 font-semibold">
                  {app.applicationStatus}
                </td>

                {/* Payment */}
                <td className="border p-3">{app.paymentStatus}</td>

                <td className="border p-3 space-y-2 flex flex-col">
                  <button
                    onClick={() => setSelectedDetails(app)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => {
                      setFeedbackModal(app);
                      setFeedbackText(app.feedback || "");
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
                  >
                    Feedback
                  </button>

                  <select
                    className="border border-gray-300 dark:border-gray-600 px-2 py-1 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={app.applicationStatus}
                    onChange={(e) =>
                      handleStatusChange(app._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <button
                    onClick={() => handleCancel(app._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Application Details</h2>

            <p>
              <b>Name:</b> {selectedDetails.ApplicantName}
            </p>
            <p>
              <b>Email:</b> {selectedDetails.ApplicantEmail}
            </p>
            <p>
              <b>University:</b> {selectedDetails.universityName}
            </p>
            <p>
              <b>Address:</b> {selectedDetails.universityAddress}
            </p>
            <p>
              <b>Category:</b> {selectedDetails.subjectCategory}
            </p>
            <p>
              <b>Status:</b> {selectedDetails.applicationStatus}
            </p>
            <p>
              <b>Payment:</b> {selectedDetails.paymentStatus || "Unpaid"}
            </p>
            <p>
              <b>Feedback:</b> {selectedDetails.feedback || "No feedback"}
            </p>

            <button
              onClick={() => setSelectedDetails(null)}
              className="mt-4 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96 shadow-2xl">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Write Feedback for {feedbackModal.ApplicantName}
            </h3>

            <textarea
              className="w-full h-32 border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            ></textarea>

            <div className="flex justify-end mt-3 gap-3">
              <button
                onClick={() => setFeedbackModal(null)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition"
              >
                Close
              </button>

              <button
                onClick={submitFeedback}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
