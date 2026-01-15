import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import Loader from "../Loader/Loader";

const PaymentCanceled = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const axiosInstance = useAxios();

  useEffect(() => {
    if (sessionId) {
      axiosInstance.get(`/applications/${sessionId}`).then((res) => {
        setPaymentData(res.data[0]);
      });
    }
  }, [sessionId, axiosInstance]);

  if (!paymentData) {
    return (
      <div
        className="min-h-screen flex items-center justify-center 
    bg-gray-100 dark:bg-[#0d1224]"
      >
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
    bg-red-50 dark:bg-[#0d1224]"
    >
      <div
        className="w-full max-w-lg rounded-xl shadow-lg p-8 text-center
      bg-white dark:bg-[#111827]
      text-gray-900 dark:text-white"
      >
        <h2
          className="text-3xl font-bold mb-4
        text-red-600 dark:text-red-400"
        >
          Payment Failed
        </h2>

        <p className="mb-2 text-gray-700 dark:text-gray-300">
          Scholarship:{" "}
          <span className="font-semibold">{paymentData.ScholarshipName}</span>
        </p>

        <p className="mb-6 text-red-500 dark:text-red-400">
          Your payment was canceled or failed. You can try again anytime.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full py-3 rounded-lg font-semibold transition
        bg-gray-800 hover:bg-gray-900
        dark:bg-blue-600 dark:hover:bg-blue-700
        text-white"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentCanceled;
