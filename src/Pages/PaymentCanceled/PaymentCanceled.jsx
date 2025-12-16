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
      axiosInstance
        .get(`/applications/${sessionId}`)
        .then((res) => {
          setPaymentData(res.data[0]);
        })
        .catch((err) => console.error(err));
    }
  }, [sessionId, axiosInstance]);

  if (!paymentData) {
    return (
      <Loader></Loader>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h2>

        <p className="text-gray-700 mb-2">
          Scholarship:{" "}
          <span className="font-semibold">{paymentData.ScholarshipName}</span>
        </p>

        <p className="text-red-500 mb-6">
          Your payment was canceled or failed. You can try again anytime.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentCanceled;
