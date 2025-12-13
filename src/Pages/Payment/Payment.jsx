import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";

const PaymentCheckout = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [application, setApplication] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/applications/${id}`)
      .then((res) => {
        setApplication(res.data[0]);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load application data");
        setLoading(false);
      });
  }, [id, axiosInstance]);

  const handlePayment = async () => {
    const paymentInfo = {
      applicationFees: application.applicationFees,
      ApplicantEmail: application.ApplicantEmail,
      applicationId: application._id,
      ScholarshipName: application.ScholarshipName,
    };

    await axiosInstance
      .post("/create-checkout-session", paymentInfo)
      .then((res) => {
        window.location.href = res.data.url;
      });

    // toast.success("Payment successful (Demo)");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center mt-20 text-red-500">
        Application not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Payment Checkout
        </h2>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Scholarship Name</span>
            <span>{application?.ScholarshipName}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">University Name</span>
            <span>{application?.universityName}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Applicant Email</span>
            <span>{application?.ApplicantEmail}</span>
          </div>

          <hr />

          <div className="flex justify-between text-lg font-semibold">
            <span>Application Fees</span>
            <span>${application.applicationFees}</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentCheckout;
