import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosInstance = useAxios();
  const { user } = useAuth();

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get(`/users?email=${user?.email}`);
      setProfile(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Profile load failed!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <div className="flex flex-col items-center mb-6">
        {/* Profile Image */}
        {profile?.photoURL ? (
          <img
            src={profile.photoURL}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-semibold mb-4">
            {profile?.name?.charAt(0).toUpperCase()}
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800">{profile?.name}</h2>
        <p className="text-gray-500">{profile?.email}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Role:</span>
          <span className="text-gray-800">{profile?.role}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Created At:</span>
          <span className="text-gray-800">
            {new Date(profile?.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          This is your account profile.
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
