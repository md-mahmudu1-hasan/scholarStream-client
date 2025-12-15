import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useRole = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const { data, isLoading, error } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user?.email}/role`);
      return res.data;
    },
  });

  return { data, isLoading, error };
};

export default useRole;
