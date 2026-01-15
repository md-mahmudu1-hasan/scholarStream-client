import React, { useState, useEffect, useRef } from "react";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

const ManageScholarships = () => {
  const axiosInstance = useAxios();
  const [scholarships, setScholarships] = useState([]);
  const [Modaldata, setModaldata] = useState([]);
  const productRef = useRef(null);
  const [loading, setLoading] = useState(false);

const fetchScholarships = async () => {
  try {
    setLoading(true);

    const res = await axiosInstance.get("/scholarship");
    setScholarships(res.data.data);
  } catch (error) {
    toast.error("Failed to load scholarships");
  } finally {
    setLoading(false);
  }
};


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
      await axiosInstance.delete(`/scholarship/${id}`);
      await fetchScholarships();

      Swal.fire({
        title: "Deleted!",
        text: "Your scholarship has been deleted.",
        icon: "success",
      });
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  const handleModal = (id) => {
    productRef.current.showModal();
    axiosInstance.get(`/scholarship/${id}`).then((res) => {
      setModaldata(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const scholarshipData = {
      scholarshipName: e.target.scholarshipName.value,
      universityName: e.target.universityName.value,
      universityImage: e.target.universityImage.value,
      universityWorldRank: e.target.universityWorldRank.value,
      degree: e.target.degree.value,
      category: e.target.category.value,
      subject: e.target.subject.value,
      location: e.target.location.value,
      deadline: e.target.deadline.value,
      applicationFees: e.target.applicationFees.value,
      stipend: e.target.stipend.value,
      description: e.target.description.value,
    };

    axiosInstance.patch(`/scholarship/${Modaldata?._id}`, scholarshipData);
    fetchScholarships();
    productRef.current.close();
    toast.success("Scholarship updated successfully");
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="w-full p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
        Manage Scholarships
      </h2>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full border border-gray-200 dark:border-gray-600 text-left">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 border">Scholarship Name</th>
              <th className="p-3 border">University Name</th>
              <th className="p-3 border text-center">Update</th>
              <th className="p-3 border text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((sch) => (
              <tr key={sch._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-3 border">{sch.scholarshipName}</td>
                <td className="p-3 border">{sch.universityName}</td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => handleModal(sch._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Update
                  </button>
                </td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => handleDelete(sch._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Edit Modal */}
      <dialog id="my_modal_1" ref={productRef} class="modal">
        <div class="modal-box bg-white dark:bg-gray-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">Scholarship Name</label>
              <input
                type="text"
                name="scholarshipName"
                defaultValue={Modaldata.scholarshipName}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">University Name</label>
              <input
                type="text"
                name="universityName"
                defaultValue={Modaldata.universityName}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">University Image URL</label>
              <input
                type="text"
                name="universityImage"
                defaultValue={Modaldata.universityImage}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">University World Rank</label>
              <input
                type="number"
                name="universityWorldRank"
                defaultValue={Modaldata.universityWorldRank}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">Degree</label>
              <input
                type="text"
                name="degree"
                defaultValue={Modaldata.degree}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">Category</label>
              <input
                type="text"
                name="category"
                defaultValue={Modaldata.category}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">Subject</label>
              <input
                type="text"
                name="subject"
                defaultValue={Modaldata.subject}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">Location</label>
              <input
                type="text"
                name="location"
                defaultValue={Modaldata.location}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">Deadline</label>
              <input
                type="date"
                name="deadline"
                defaultValue={Modaldata.deadline}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">Application Fees</label>
              <input
                type="text"
                name="applicationFees"
                defaultValue={Modaldata.applicationFees}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">Stipend</label>
              <input
                type="text"
                name="stipend"
                defaultValue={Modaldata?.stipend}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                name="description"
                defaultValue={Modaldata.description}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows="4"
              ></textarea>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageScholarships;
