import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Loader from "../Loader/Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Aaanalytics = () => {
  const axiosInstance = useAxios();
  const { data, isLoading } = useQuery({
    queryKey: ["application-analytics"],
    queryFn: () =>
      axiosInstance
        .get("/applications/universityName/stats")
        .then((res) => res.data),
  });
  const { data: totalUsersData, isLoading: totalUsersLoading } = useQuery({
    queryKey: ["total-users"],
    queryFn: () => axiosInstance.get("/users").then((res) => res.data),
  });
  const { data: totalScholarshipsData, isLoading: totalScholarshipsLoading } =
    useQuery({
      queryKey: ["total-scholarships"],
      queryFn: () => axiosInstance.get("/scholarship").then((res) => res.data),
    });

  const generateColors = (num) => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      const hue = Math.floor((360 / num) * i);
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  };

  const chartData = {
    labels: data ? data.map((item) => item.universityName) : [],
    datasets: [
      {
        label: "Applications",
        data: data ? data.map((item) => item.count) : [],
        backgroundColor: data ? generateColors(data.length) : [],
      },
    ],
  };

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Applications per University",
      font: {
        size: 18,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        autoSkip: true,
        maxRotation: 45,
        minRotation: 20,
      },
    },
    y: {
      beginAtZero: true,
    },
  },
};


  if (isLoading || totalUsersLoading || totalScholarshipsLoading)
    return <Loader />;

  const totalUsers = totalUsersData?.length;
  const totalScholarships = totalScholarshipsData?.data?.length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Platform Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <p className="text-gray-500">Total Users</p>
          <p className="text-3xl font-semibold">{totalUsers}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <p className="text-gray-500">Total Scholarships</p>
          <p className="text-3xl font-semibold">{totalScholarships}</p>
        </div>
      </div>
<div className="w-full h-[300px] sm:h-[350px] md:h-[450px]">
  <Bar data={chartData} options={chartOptions} />
</div>

    </div>
  );
};

export default Aaanalytics;
