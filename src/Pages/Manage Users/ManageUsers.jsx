import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosInstance = useAxios();
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("All");

  useEffect(() => {
    axiosInstance.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const filteredUsers =
    filterRole === "All"
      ? users
      : users.filter((user) => user.role === filterRole);

  const handleRoleChange = (id, newRole) => {
    axiosInstance.patch(`/users/${id}`, { role: newRole }).then((res) => {
      toast.success("Role updated successfully");
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role: newRole } : user
        )
      );
    });
  };

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
        axiosInstance.delete(`/users/${id}`).then((res) => {
          toast.success("User deleted");
          setUsers(users.filter((u) => u._id !== id));
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="mb-4 flex items-center gap-3">
        <label className="font-medium">Filter by Role:</label>
        <select
          className="border px-3 py-2 rounded"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="All">All</option>
          <option value="student">student</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Role</th>
              <th className="border px-4 py-2 text-center">Change Role</th>
              <th className="border px-4 py-2 text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 font-semibold">{user.role}</td>

                <td className="border px-4 py-2 text-center">
                  <select
                    className="border px-3 py-2 rounded"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleDelete(user._id)}
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

export default ManageUsers;
