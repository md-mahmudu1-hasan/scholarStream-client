import { useLocation, useNavigate } from "react-router";

const PaymentCanceled = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const scholarshipName =
    query.get("scholarshipName") || "Scholarship Application";
  const errorMessage =
    query.get("error") ||
    "Your payment was canceled or failed. You can try again anytime.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Payment Failed
        </h2>

        <p className="text-gray-700 mb-2">
          Scholarship:{" "}
          <span className="font-semibold">{scholarshipName}</span>
        </p>

        <p className="text-red-500 mb-6">
          {errorMessage}
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
