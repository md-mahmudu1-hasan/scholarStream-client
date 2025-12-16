import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import Loader from "../Loader/Loader";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/reviews").then((res) => {
      setReviews(res.data.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        const remainingReviews = reviews.filter((r) => r._id !== id);
        setReviews(remainingReviews);

        axiosInstance
          .delete(`/reviews/${id}`)
          .then((res) => {
            if (res.data.success) {
              Swal.fire("Deleted!", "Review removed.", "success");
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete review.", "error");
            axiosInstance.get("/reviews").then((res) => {
              setReviews(res.data.data);
            });
          });
      }
    });
  };

  if (loading) {
    return <Loader></Loader>
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        All Student Reviews
      </h2>
      <div className="border rounded-md">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="border px-2 py-4 w-[4%]">#</th>
              <th className="border px-2 py-4 w-[18%]">Email</th>
              <th className="border px-2 py-4 w-[16%]">Scholarship</th>
              <th className="border px-2 py-4 w-[16%]">University</th>
              <th className="border px-2 py-4 w-[26%]">Comment</th>
              <th className="border px-2 py-4 w-[8%] text-center">Rating</th>
              <th className="border px-2 py-4 w-[12%] text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review, index) => (
              <tr key={review._id} className="hover:bg-gray-50">
                <td className="border px-2 py-4 text-center">{index + 1}</td>
                <td className="border px-2 py-4 truncate">
                  {review.userEmail}
                </td>
                <td className="border px-2 py-4 truncate">
                  {review.ScholarshipName}
                </td>
                <td className="border px-2 py-4 truncate">
                  {review.universityName}
                </td>
                <td className="border px-2 py-4 truncate text-gray-600">
                  {review.reviewComment}
                </td>
                <td className="border px-2 py-4 text-center">
                  {review.ratingPoint}
                </td>
                <td className="border px-2 py-4 text-center">
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReviews;
