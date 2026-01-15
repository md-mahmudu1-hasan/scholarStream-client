import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import Loader from "../Loader/Loader";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    if (sessionId) {
      axiosInstance.get(`/applications/${sessionId}`).then((res) => {
        setPaymentData(res.data[0]);
      });
    }
  }, [sessionId, axiosInstance]);

  useEffect(() => {
    if (sessionId) {
      axiosInstance
        .patch(`/applications/${sessionId}`, { paymentStatus: "Paid" })
        .then(() => {})
        .catch(() => {});
    }
  }, [axiosInstance, sessionId]);

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
    bg-gray-100 dark:bg-[#0d1224]"
    >
      <div
        className="w-full max-w-lg rounded-xl shadow-lg p-8
      bg-white dark:bg-[#111827]
      text-gray-900 dark:text-white"
      >
        <h2
          className="text-3xl font-bold text-center mb-4
      text-green-600 dark:text-green-400"
        >
          Payment Successful
        </h2>

        <p
          className="text-center mb-6
      text-gray-600 dark:text-gray-300"
        >
          Thank you! Your scholarship application fee has been paid
          successfully.
        </p>

        <div
          className="border rounded-lg p-4 space-y-3
        border-gray-300 dark:border-gray-600"
        >
          <div className="flex justify-between gap-4">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Scholarship Name
            </span>
            <span className="text-right">{paymentData.ScholarshipName}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              University Name
            </span>
            <span className="text-right">{paymentData.universityName}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Applicant Email
            </span>
            <span className="text-right break-all">
              {paymentData.ApplicantEmail}
            </span>
          </div>

          <div
            className="flex justify-between text-lg font-semibold
          text-green-600 dark:text-green-400"
          >
            <span>Amount Paid</span>
            <span>${paymentData.applicationFees}</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard/my-applications")}
          className="w-full mt-6 py-3 rounded-lg font-semibold transition
        bg-blue-600 hover:bg-blue-700 text-white"
        >
          Go to My Applications
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
