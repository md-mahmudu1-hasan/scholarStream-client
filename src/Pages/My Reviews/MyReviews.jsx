import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";

const MyReviews = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get(`/reviews?userEmail=${user.email}`);

        setReviews(res.data.data || []);
      } catch (error) {
        toast.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user?.email, axiosInstance]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const previousReviews = [...reviews];
      setReviews(reviews.filter((r) => r._id !== id));

      try {
        await axiosInstance.delete(`/reviews/${id}`);
        toast.success("Review deleted successfully");

        Swal.fire({
          title: "Deleted!",
          text: "Your review has been deleted.",
          icon: "success",
        });
      } catch (error) {
        toast.error("Failed to delete review");
        setReviews(previousReviews);
      }
    }
  };

  const handleEdit = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedReview = {
      reviewComment: e.target.comment.value,
      ratingPoint: e.target.rating.value,
    };

    const res = await axiosInstance.patch(
      `/reviews/${selectedReview._id}`,
      updatedReview
    );

    if (res.data.success) {
      toast.success("Review updated");
      setIsModalOpen(false);

      setReviews(
        reviews.map((r) =>
          r._id === selectedReview._id ? { ...r, ...updatedReview } : r
        )
      );
    }
  };

  if (loading) return <Loader></Loader>;

  return (
    <div className="p-6 bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Reviews</h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm">
        <table className="w-full border-collapse border border-gray-200 dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="border px-4 py-3 text-left">Scholarship</th>
              <th className="border px-4 py-3 text-left">University</th>
              <th className="border px-4 py-3 text-left">Comment</th>
              <th className="border px-4 py-3">Date</th>
              <th className="border px-4 py-3">Rating</th>
              <th className="border px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="border px-4 py-2">{review.ScholarshipName}</td>
                <td className="border px-4 py-2">{review.universityName}</td>
                <td className="border px-4 py-2 max-w-xs truncate">
                  {review.reviewComment}
                </td>
                <td className="border px-4 py-2 text-center">
                  {new Date(review.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 text-center">
                  {review.ratingPoint} ⭐
                </td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(review)}
                    className="px-3 my-2 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {reviews.length === 0 && (
              <tr>
                <td colSpan="6" className="py-8 text-center text-gray-500 dark:text-gray-400">
                  No reviews found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Edit Review</h3>

            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Comment</label>
                <textarea
                  name="comment"
                  defaultValue={selectedReview.reviewComment}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Rating</label>
                <select
                  name="rating"
                  defaultValue={selectedReview.ratingPoint}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:text-white rounded transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
