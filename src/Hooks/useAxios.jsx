import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

const useAxios = () => {
  const { user, SignOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const reInterceptor = axiosInstance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    const resInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          SignOut().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(reInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [user]);
  return axiosInstance;
};

export default useAxios;
