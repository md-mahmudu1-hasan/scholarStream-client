import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import Loader from "../Loader/Loader";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosInstance = useAxios();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(
          `/users?email=${user.email}`
        );

        const data = Array.isArray(res.data)
          ? res.data[0]
          : res.data;

        setProfile(data);
      } catch (err) {
        setError("Profile load failed!");
      } finally {
        setLoading(false);
      }
    };
    console.log("Auth User Email:", user?.email);

    fetchProfile();
  }, [user?.email, authLoading, axiosInstance]);

  // 🔹 Loader
  if (loading || authLoading) {
    return <Loader />;
  }

  // 🔹 Error
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  // 🔹 Profile না পেলে
  if (!profile) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">No profile data found</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col items-center mb-6">
        {/* Profile Image */}
        {profile.photoURL ? (
          <img
            src={profile.photoURL}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-300 text-xl font-semibold mb-4">
            {profile.name?.charAt(0).toUpperCase()}
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {profile.name}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">{profile.email}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300 font-medium">Role:</span>
          <span className="text-gray-800 dark:text-gray-200">{profile.role}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            Created At:
          </span>
          <span className="text-gray-800 dark:text-gray-200">
            {new Date(profile.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-400 dark:text-gray-500 text-sm">
          This is your account profile.
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
