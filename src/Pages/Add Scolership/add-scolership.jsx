import React, { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";

const AddScholarshipForm = () => {
  const axiosInstance = useAxios();
  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    universityImage: "",
    universityWorldRank: "",
    degree: "",
    category: "",
    subject: "",
    location: "",
    deadline: "",
    applicationFees: "",
    stipend: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance.post("/scholarship", formData).then((res) => {
      toast.success("Scholarship added successfully");

      // Reset form fields properly
      setFormData({
        scholarshipName: "",
        universityName: "",
        universityImage: "",
        universityWorldRank: "",
        degree: "",
        category: "",
        subject: "",
        location: "",
        deadline: "",
        applicationFees: "",
        stipend: "",
        description: "",
      });
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add Scholarship</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Scholarship Name</label>
          <input
            type="text"
            name="scholarshipName"
            value={formData.scholarshipName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="block font-medium">University Name</label>
          <input
            type="text"
            name="universityName"
            value={formData.universityName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="block font-medium">University Image URL</label>
          <input
            type="text"
            name="universityImage"
            value={formData.universityImage}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">University World Rank</label>
          <input
            type="number"
            name="universityWorldRank"
            value={formData.universityWorldRank}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Degree</label>
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Application Fees</label>
          <input
            type="number"
            name="applicationFees"
            value={formData.applicationFees}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Stipend</label>
          <input
            type="text"
            name="stipend"
            value={formData.stipend}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarshipForm;
