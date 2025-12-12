import React, { useState, useEffect, useRef } from "react";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageScholarships = () => {
  const axiosInstance = useAxios();
  const [scholarships, setScholarships] = useState([]);
  const [Modaldata, setModaldata] = useState([]);
  const productRef = useRef(null);

  const fetchScholarships = async () => {
    const res = await axiosInstance.get("/scholarship");
    setScholarships(res.data);
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/scholarship/${id}`);
        fetchScholarships();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

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

  return (
    <div className="w-full p-6 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Manage Scholarships
      </h2>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full border border-gray-200 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Scholarship Name</th>
              <th className="p-3 border">University Name</th>
              <th className="p-3 border text-center">Update</th>
              <th className="p-3 border text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((sch) => (
              <tr key={sch._id} className="hover:bg-gray-50">
                <td className="p-3 border">{sch.scholarshipName}</td>
                <td className="p-3 border">{sch.universityName}</td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => handleModal(sch._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                </td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => handleDelete(sch._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
        <div class="modal-box">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Scholarship Name</label>
              <input
                type="text"
                name="scholarshipName"
                defaultValue={Modaldata.scholarshipName}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">University Name</label>
              <input
                type="text"
                name="universityName"
                defaultValue={Modaldata.universityName}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">University Image URL</label>
              <input
                type="text"
                name="universityImage"
                defaultValue={Modaldata.universityImage}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">University World Rank</label>
              <input
                type="number"
                name="universityWorldRank"
                defaultValue={Modaldata.universityWorldRank}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">Degree</label>
              <input
                type="text"
                name="degree"
                defaultValue={Modaldata.degree}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">Category</label>
              <input
                type="text"
                name="category"
                defaultValue={Modaldata.category}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">Subject</label>
              <input
                type="text"
                name="subject"
                defaultValue={Modaldata.subject}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">Location</label>
              <input
                type="text"
                name="location"
                defaultValue={Modaldata.location}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">Deadline</label>
              <input
                type="date"
                name="deadline"
                defaultValue={Modaldata.deadline}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">Application Fees</label>
              <input
                type="text"
                name="applicationFees"
                defaultValue={Modaldata.applicationFees}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">Stipend</label>
              <input
                type="text"
                name="stipend"
                defaultValue={Modaldata?.stipend}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">Description</label>
              <textarea
                name="description"
                defaultValue={Modaldata.description}
                className="w-full border rounded px-3 py-2 mt-1"
                rows="4"
              ></textarea>
            </div>
            <div className="flex justify-between mt-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Edit Scholarship
              </button>
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageScholarships;
