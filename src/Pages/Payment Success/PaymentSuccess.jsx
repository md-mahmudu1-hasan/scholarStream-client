import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxios from "../../Hooks/useAxios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [paymentData, setPaymentData] = useState(null);

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

  useEffect(() => {
    if (sessionId) {
      axiosInstance
        .patch(`/applications/${sessionId}`, { paymentStatus: "Paid" })
        .then((res) => {
          console.log("Payment status updated:", res.data);
        })
        .catch((err) => {
          console.error("Failed to update payment status:", err);
        });
    }
  }, [axiosInstance, sessionId]);

  if (!paymentData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Loading payment details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-green-600 text-center mb-4">
          Payment Successful
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Thank you! Your scholarship application fee has been paid
          successfully.
        </p>

        <div className="border rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Scholarship Name</span>
            <span>{paymentData.ScholarshipName}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">University Name</span>
            <span>{paymentData.universityName}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Applicant Email</span>
            <span>{paymentData.ApplicantEmail}</span>
          </div>

          <div className="flex justify-between text-lg font-semibold text-green-600">
            <span>Amount Paid</span>
            <span>${paymentData.applicationFees}</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard/my-applications")}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Go to My Applications
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
